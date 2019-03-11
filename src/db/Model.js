// @flow
// Importations
import type { Database } from "sqlite";

// Classe
export default class Model {
    // Champ
    db: Database;
    fields: any;

    // Propriétés
    #pk: any;
    get pk() {
        return this.#pk;
    }

    // Constructeur
    constructor(db: Database, pk: any, fields: any = {}) {
        this.db = db;
        this.fields = fields;
        this.#pk = pk;
    }
}