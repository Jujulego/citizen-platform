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
    static async create(db: Database, data: { id: number, debut: string, fin: string, repetitions: number, ecart: string, citoyen: Citoyen }):

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
}