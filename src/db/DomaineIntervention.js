// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model"
import Citoyen from "./Citoyen";

// Classe
export default class DomaineIntervention extends Model {
    // Attributs
    nom: string;

    // Propriétés
    #id: number;
    get id(): number { return this.#id }

    // Constructeur
    constructor(db: Database, { idDomaine, nom, loginCitoyen }: { idDomaine: number, nom: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Méthodes
        this.#id = idDomaine;
        this.nom = nom;
        this.#loginCitoyen = loginCitoyen;
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

    // Méthodes
    #loginCitoyen: string; #citoyen: ?Citoyen = null;
    async getCitoyen(): Promise<Citoyen> {
        // Récupération du citoyen
        if (!this.#citoyen) {
            this.#citoyen = await Citoyen.get(this.db, this.#loginCitoyen);
        }

        return this.#citoyen;
    }

    setCitoyen(citoyen: Citoyen | string) {
        if (typeof citoyen === "string") {
            if (citoyen !== this.#loginCitoyen) {
                this.#loginCitoyen = citoyen;
                this.#citoyen = null;
            }
        } else if (citoyen instanceof Citoyen) {
            if (citoyen.login === this.#loginCitoyen) {
                this.#loginCitoyen = citoyen.login;
                this.#citoyen = citoyen;
            }
        }
    }
}