// @flow
// Importations
import type { Database } from "sqlite";

// Classe
export default class Model<T: Model<*>> {
    // Champ
    db: Database;
    fields: any;

    // Propriétés
    #pk: ?string | number;
    get pk(): ?string | number {
        return this.#pk;
    }

    // Constructeur
    constructor(db: Database, pk: ?string | number, fields: { [string]: any } = {}) {
        this.db = db;
        this.fields = fields;
        this.#pk = pk;
    }

    // Méthodes
    static async get(db: Database, sql: string, params: Array<any>, creator: ({ [string]: any }) => T): Promise<?T> {
        const data = await db.get(sql, params);
        return data ? creator(data) : null;
    }

    static async all(db: Database, sql: string, params: Array<any>, creator: ({ [string]: any }) => T): Promise<Array<T>> {
        const data = await db.all(sql, params);
        return data.map(creator);
    }
}