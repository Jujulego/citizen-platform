// @flow
// Importations
import type { Database } from "sqlite";

import Creneau from "./Creneau";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class CreneauCitoyen extends Creneau<CreneauCitoyen> {
    // Attributs
    citoyen: ForeignKey<Citoyen>;

    // Constructeur
    constructor(db: Database, data: { id: number, debut: string, fin: string, repetitions: number, ecart: string, citoyen: string }, fields: any = {}) {
        super(db, data, fields);

        // Remplissage
        this.citoyen = new ForeignKey<Citoyen>(data.citoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { debut: string, fin: string, repetitions: number, ecart: string, citoyen: Citoyen }): Promise<CreneauCitoyen> {
        const res = await db.run(
            "insert into creneau_citoyen values (null, ?, ?, ?, ?, ?)",
            [data.debut, data.fin, data.repetitions, data.ecart, data.citoyen.login]
        );

        return new CreneauCitoyen(db, {
            id: res.stmt.lastID,
            debut: data.debut, fin: data.fin, repetitions: data.repetitions, ecart: data.ecart,
            citoyen: data.citoyen.login
        });
    }

    static async getById(db: Database, id: number): Promise<?CreneauCitoyen> {
        return await CreneauCitoyen.get(db,
            "select * from creneau_citoyen where id = ?", [id],
            (data) => new CreneauCitoyen(db, data)
        );
    }

    static async allByCitoyen(db: Database, citoyen: Citoyen): Promise<Array<CreneauCitoyen>> {
        return await CreneauCitoyen.all(db,
            "select * from creneau_citoyen where citoyen = ? order by debut", [citoyen.login],
            (data) => new CreneauCitoyen(db, data)
        );
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update creneau_citoyen set debut=?, fin=?, repetitions=?, ecart=?, citoyen=? where id=?",
            [this.debut, this.fin, this.repetitions, this.ecart, this.citoyen.pk, this.id]
        )
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from creneau_citoyen where id=?", [this.id]
        )
    }
}