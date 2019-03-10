// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";

// Classe
export default class Competance extends Model {
    // Attributs
    nom: string;
    description: string;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, { idCompetance, nom, description, loginCitoyen }: { idCompetance: number, nom: string, description: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id = idCompetance;
        this.nom = nom;
        this.description = description;
        this.#loginCitoyen = loginCitoyen;
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