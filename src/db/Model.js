// @flow
// Importations
import type { Database } from "sqlite";

// Classe
export default class Model {
    // Champ
    db: Database;
    fields: any;

    // Constructeur
    constructor(db: Database, fields: any = {}) {
        this.db = db;
        this.fields = fields;
    }
}