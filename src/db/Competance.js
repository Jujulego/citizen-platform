// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class Competance extends Model {
    // Attributs
    nom: string;
    description: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, data: { idCompetance: number, nom: string, description: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id = data.idCompetance;
        this.nom = data.nom;
        this.description = data.description;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.get(db, pk));
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?Competance> {
        // Récupération
        const data = await db.get("select * from competance where idCompetance = ?", id);

        if (data) {
            return new Competance(db, data);
        } else {
            return null;
        }
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<Competance>> {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from competance where loginCitoyen = ?", citoyen);
        return data.map((d) => new Competance(db, d));
    }
}