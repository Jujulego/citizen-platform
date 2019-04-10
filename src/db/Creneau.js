// @flow
// Importations
import type { Database } from "sqlite";
import Model from './Model';

// Utils
const JOUR  = 24 * 60 * 60 * 1000; // en ms
const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function jour_txt(date: Date): string {
    return JOURS[date.getDay()]
}

function date_txt(date: Date): string {
    let mois = date.getMonth() + 1;

    if (mois < 10) {
        mois = "0" + mois;
    }

    return `${date.getDate()}/${mois}/${date.getFullYear()}`;
}

function time_txt(date: Date): string {
    let heure = date.getHours();
    let min = date.getMinutes();

    if (heure < 10) heure = "0" + heure;
    if (min < 10)   min = "0" + min;

    return `${heure}:${min}`;
}

// Classe
export default class Creneau<T: Creneau<*>> extends Model<T> {
    // Attributs
    debut: Date;
    fin: Date;
    repetitions: number; // 0 => infini
    ecart: number;       // nb de jours entre 2 répétitions

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    get debut_jour_txt(): string { return jour_txt(this.debut); }
    get debut_time_txt(): string { return time_txt(this.debut); }
    get debut_date_txt(): string { return date_txt(this.debut); }
    get debut_txt(): string { return `${this.debut_jour_txt} ${this.debut_date_txt} - ${this.debut_time_txt}`; }

    get tempsMission(): number { // minutes
        let mil = this.fin - this.debut;
        return (mil / 1000) / 60;
    }

    // Constructeur
    constructor(db: Database, data: { id: number, debut: Date|string, fin: Date|string, repetitions: number, ecart: number }, fields: any = {}) {
        super(db, data.id, fields);

        // Remplissage
        this.#id   = data.id;
        this.debut = new Date(data.debut);
        this.fin   = new Date(data.fin);
        this.repetitions = data.repetitions;
        this.ecart = data.ecart;
    }

    // Méthode
    generateRepetitions(start: Date, end: Date, cb: (r: number, debut: Date, fin: Date) => void): void {
        // 1ere
        if (end > this.debut && start < this.fin) {
            cb(0, this.debut, this.fin);
        }

        if (this.repetitions === 0) {
            // Répétitions infines
            let debut = this.debut.getTime();
            let fin   = this.fin.getTime();

            // => 1ère date affichable
            if (fin < start.getTime()) {
                let delta = (start.getTime() - debut);
                debut += delta - (delta % (JOUR * this.ecart));

                delta = (start.getTime() - fin);
                fin += delta - (delta % (JOUR * this.ecart));
            }

            let r = (debut - this.debut.getTime()) / (JOUR * this.ecart);
            while (end.getTime() > debut) {
                debut += JOUR * this.ecart;
                fin   += JOUR * this.ecart;
                ++r;

                if (end.getTime() > debut && start.getTime() < fin) {
                    cb(r, new Date(debut), new Date(fin));
                }
            }
        } else {
            // Répétitions
            let debut = this.debut.getTime();
            let fin   = this.fin.getTime();

            for (let r = 1; r < this.repetitions; ++r) {
                // nouvelles dates
                debut += JOUR * this.ecart;
                fin   += JOUR * this.ecart;

                if (end.getTime() > debut && start.getTime() < fin) {
                    cb(r, new Date(debut), new Date(fin));
                }
            }
        }
    }

    getRepetition(r: number): ?{ r: number, debut: Date, fin: Date } {
        // Gardien
        if (this.repetitions !== 0 && r >= this.repetitions) {
            return null;
        }

        // Calcul
        return { r,
            debut: new Date(this.debut.getTime() + r * this.ecart * JOUR),
            fin:   new Date(this.fin.getTime()   + r * this.ecart * JOUR)
        }
    }
}
