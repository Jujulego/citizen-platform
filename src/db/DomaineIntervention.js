// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class DomaineIntervention extends Model {
    // Attributs
    nom: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id }

    // Constructeur
    constructor(db: Database, data: { idDomaine: number, nom: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Méthodes
        this.#id = data.idDomaine;
        this.nom = data.nom;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.get(db, pk));
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?DomaineIntervention> {
        // Récupération
        const data = await db.get("select * from domaineIntervention where idDomaine = ?", id);
        return new DomaineIntervention(db, data);
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<DomaineIntervention>> {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from domaineIntervention where loginCitoyen = ?", citoyen);
        return data.map((d) => new DomaineIntervention(db, d));
    }
}