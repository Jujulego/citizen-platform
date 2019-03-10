// @flow
// Importations
import type { Database } from "sqlite";

import Citoyen from "./Citoyen";
import Model from "./Model";

// Classe
export default class Document extends Model {
    // Attributs
    titre: string;
    lien: string;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, { idDocument, titre, lien, loginCitoyen }: { idDocument: number, titre: string, lien: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id = idDocument;
        this.titre = titre;
        this.lien = lien;
        this.#loginCitoyen = loginCitoyen;
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?Document> {
        // Récupération
        const data = await db.get("select * from document where idDocument = ?", id);

        if (data) {
            return new Document(db, data);
        } else {
            return null;
        }
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<Document>> {
        // Recupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from document where loginCitoyen = ?", citoyen);
        return data.map((d) => new Document(db, d));
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