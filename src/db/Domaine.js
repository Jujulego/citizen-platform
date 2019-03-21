// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";

// Classe
export default class Domaine extends Model<Domaine> {
    // Attributs
    nom: string;

    // Propriétés
    #id: number;
    get id(): number { return this.#id }

    // Constructeur
    constructor(db: Database, data: { id: number, nom: string }, fields: any = {}) {
        super(db, data.id, fields);

        // Méthodes
        this.#id = data.id;
        this.nom = data.nom;
    }

    // Méthodes statiques
    static async create(db: Database, data: { nom: string }): Promise<Domaine> {
        const res = await db.run(
            "insert into domaine(id, nom) values (null, ?)", [data.nom]
        );

        return new Domaine(db, {
            id: res.stmt.lastID,
            nom: data.nom
        });
    }

    static async getById(db: Database, id: number): Promise<?Domaine> {
        return await Domaine.get(db,
            "select * from domaine where id = ?", [id],
            (data) => new Domaine(db, data)
        );
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update domaine set nom=? where id=?",
            [this.nom, this.id]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from domaine where id=?", [this.id]
        )
    }
}