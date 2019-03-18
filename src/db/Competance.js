// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class Competance extends Model<Competance> {
    // Attributs
    nom: string;
    description: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, data: { idCompetance: number, nom: string, description: string, loginCitoyen: string }, fields: any = {}) {
        super(db, data.idCompetance, fields);

        // Remplissage
        this.#id = data.idCompetance;
        this.nom = data.nom;
        this.description = data.description;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { nom: string, description: string, citoyen: Citoyen }): Promise<Competance> {
        const res = await db.run(
            "insert into competance values (null, ?, ?, ?)",
            [data.nom, data.description, data.citoyen.pk]
        );

        return new Competance(db, {
            idCompetance: res.stmt.lastID,
            nom: data.nom, description: data.description,
            loginCitoyen: data.citoyen.login,
        });
    }

    static async getById(db: Database, id: number): Promise<?Competance> {
        return await Competance.get(db,
            "select * from competance where idCompetance = ?", [id],
            (data) => new Competance(db, data)
        );
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen): Promise<Array<Competance>> {
        return await Competance.all(db,
            "select * from competance where loginCitoyen = ?", [citoyen.login],
            (data) => new Competance(db, data)
        );
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update competance set nom=?, description=?, loginCitoyen=? where idCompetance=?",
            [this.nom, this.description, this.citoyen.pk, this.id]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from competance where idCompetance=?", [this.id]
        );
    }
}