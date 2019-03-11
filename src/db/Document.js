// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class Document extends Model<Document> {
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
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async getById(db: Database, id: number): Promise<?Document> {
        return await Document.get(db,
            "select * from document where idDocument = ?", [id],
            (data) => new Document(db, data)
        );
    }

    static async allByCitoyen(db: Database, citoyen: Citoyen): Promise<Array<Document>> {
        return await Document.all(db,
            "select * from document where loginCitoyen = ?", [citoyen.login],
            (data) => new Document(db, data)
        );
    }
}