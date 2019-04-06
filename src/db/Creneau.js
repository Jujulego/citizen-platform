// @flow
// Importations
import type { Database } from "sqlite";
import Model from './Model';

// Classe
export default class Creneau<T: Creneau<*>> extends Model<T> {
    // Attributs
    debut: string;
    fin: string;
    repetitions: number; // 0 => infini
    ecart: string;       // entre 2 répétitions

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    get debut_jour_txt(): string {
        let jour = this.debut.getDay();

        switch(jour){
            case 0 : jour = "Lundi"; break;
            case 1 : jour = "Mardi"; break;
            case 2 : jour = "Mercredi"; break;
            case 3 : jour = "Jeudi"; break;
            case 4 : jour = "Vendredi"; break;
            case 5 : jour = "Samedi"; break;
            case 6 : jour = "Dimanche"; break;
        }

        return jour;
    }

    get debut_time_txt(): string {
        let heure = this.debut.getHours();
        let min = this.debut.getMinutes();

        let time = heure + ":" + min;
        return time;
    }

    get debut_txt(): string {
        let jour = this.debut.getDay();

        switch(jour){
            case 0 : jour = "Lundi"; break;
            case 1 : jour = "Mardi"; break;
            case 2 : jour = "Mercredi"; break;
            case 3 : jour = "Jeudi"; break;
            case 4 : jour = "Vendredi"; break;
            case 5 : jour = "Samedi"; break;
            case 6 : jour = "Dimanche"; break;
        }

        let jourNum = this.debut.getDate();
        let moi = this.debut.getMonth() + 1;
        if(moi < 10){
            moi = "0" + moi;
        }
        let annee = this.debut.getFullYear();

        let heure = this.debut.getHours();
        let min = this.debut.getMinutes();

        let text = jour +" " + jourNum + "/" + moi + "/" + annee + " - " + heure + ":" + min;
        return text;
    }

    get debut_date_txt(): string {
        let jourNum = this.debut.getDate();
        let moi = this.debut.getMonth() + 1;
        if(moi < 10){
            moi = "0" + moi;
        }
        let annee = this.debut.getFullYear();

        let date = jourNum + "/" + moi + "/" + annee;
        return date;
    }

    get tempsMission(): string {
        let mil = this.fin - this.debut;
        return (mil/1000)/60;
    }

    // Constructeur
    constructor(db: Database, data: { id: number, debut: string, fin: string, repetitions: number, ecart: string }, fields: any = {}) {
        super(db, data.id, fields);

        // Remplissage
        this.#id   = data.id;
        this.debut = new Date(data.debut);
        this.fin   = new Date(data.fin);
        this.repetitions = data.repetitions;
        this.ecart = data.ecart;
    }
}
