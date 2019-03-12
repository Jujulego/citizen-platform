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

    // Constructeur
    constructor(db: Database, data: { id: number, debut: string, fin: string, repetitions: number, ecart: string }, fields: any = {}) {
        super(db, data.id, fields);

        // Remplissage
        this.#id   = data.id;
        this.debut = data.debut;
        this.fin   = data.fin;
        this.repetitions = data.repetitions;
        this.ecart = data.ecart;
    }
}