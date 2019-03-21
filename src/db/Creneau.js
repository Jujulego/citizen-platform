// @flow
// Importations
import type { Database } from "sqlite";
import Model from './Model';

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
}