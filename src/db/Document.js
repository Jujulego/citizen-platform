// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class Document extends Model {
    // Attributs
    titre: string;
    lien: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, data: { idDocument: number, titre: string, lien: string, loginCitoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id   = data.idDocument;
        this.titre = data.titre;
        this.lien  = data.lien;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.get(db, pk));
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
}