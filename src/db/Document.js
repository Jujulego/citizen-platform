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
        super(db, data.idDocument, fields);

        // Remplissage
        this.#id   = data.idDocument;
        this.titre = data.titre;
        this.lien  = data.lien;
        this.citoyen = new ForeignKey<Citoyen>(data.loginCitoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { titre: string, lien: string, citoyen: Citoyen }): Promise<Document> {
        const res = await db.run(
            "insert into document values (null, ?, ?, ?)",
            [data.titre, data.lien, data.citoyen.pk]
        );

        return new Document(db, {
            idDocument: res.stmt.lastID,
            titre: data.titre, lien: data.lien,
            loginCitoyen: data.citoyen.login,
        });
    }

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

    // Méthode
    async save(): Promise<void> {
        await this.db.run(
            "update document set titre=?, lien=?, loginCitoyen=? where idDocument=?",
            [this.titre, this.lien, this.citoyen.pk, this.id]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from document where idDocument=?", [this.id]
        );
    }
}