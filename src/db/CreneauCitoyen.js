// @flow
// Importations
import type { Database } from "sqlite";

import Creneau from "./Creneau";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class CreneauCitoyen extends Creneau {
    // Attributs
    citoyen: ForeignKey<Citoyen>;

    // Constructeur
    constructor(db: Database, data: { id: number, debut: string, fin: string, repetitions: number, ecart: string, citoyen: string }, fields: any = {}) {
        super(db, data, fields);

        // Remplissage
        this.citoyen = new ForeignKey<Citoyen>(data.citoyen, (pk) => Citoyen.get(db, pk));
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?CreneauCitoyen> {
        // Recupération
        const data = await db.get("select * from creneau_citoyen where id = ?", id);

        if (data) {
            return new CreneauCitoyen(db, data);
        } else {
            return null;
        }
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<CreneauCitoyen>> {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from creneau_citoyen where citoyen = ? order by debut", citoyen);
        return data.map((d) => new CreneauCitoyen(db, d));
    }
}