// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class DomaineIntervention extends Model<DomaineIntervention> {
    // Attributs
    nom: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id }

    // Constructeur
    constructor(db: Database, data: { idDomaine: number, nom: string, loginCitoyen: string }, fields: any = {}) {
        super(db, data.idDomaine, fields);

        // Méthodes
        this.#id = data.idDomaine;
        this.nom = data.nom;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async getById(db: Database, id: number): Promise<?DomaineIntervention> {
        return await DomaineIntervention.get(db,
            "select * from domaineIntervention where idDomaine = ?", [id],
            (data) => new DomaineIntervention(db, data)
        );
    }

    static async allByCitoyen(db: Database, citoyen: Citoyen): Promise<Array<DomaineIntervention>> {
        return await DomaineIntervention.all(db,
            "select * from domaineIntervention where loginCitoyen = ?", [citoyen.login],
            (data) => new DomaineIntervention(db, data)
        );
    }
}