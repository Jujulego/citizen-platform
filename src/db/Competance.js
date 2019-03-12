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
}