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
    constructor(db: Database, { id, debut, fin, repetitions, ecart }: { id: number, debut: string, fin: string, repetitions: number, ecart: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id = id;
        this.debut = debut;
        this.fin = fin;
        this.repetitions = repetitions;
        this.ecart = ecart;
    }
}