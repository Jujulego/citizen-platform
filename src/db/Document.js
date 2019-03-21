// @flow
// Importations
import fs from "fs";
import path from "path";

import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Constante
const MEDIA_PATH = path.join(__dirname, "../../media");

// Classe
export default class Document extends Model<Document> {
    // Attributs
    titre: string;
    citoyen: ForeignKey<Citoyen>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    #fichier: string;
    get fichier(): string { return `/media/${this.#fichier}`; }
    set fichier(v: string) { this.#fichier = v; }

    get filename(): string {
        return this.titre + path.extname(this.#fichier);
    }

    // Constructeur
    constructor(db: Database, data: { id: number, titre: string, fichier: string, citoyen: string }, fields: any = {}) {
        super(db, data.id, fields);

        // Remplissage
        this.#id   = data.id;
        this.titre = data.titre;
        this.#fichier  = data.fichier;
        this.citoyen = new ForeignKey<Citoyen>(data.citoyen, (pk) => Citoyen.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { titre: string, fichier: string, citoyen: Citoyen }): Promise<Document> {
        const res = await db.run(
            "insert into document(id, titre, fichier, citoyen) values (null, ?, ?, ?)",
            [data.titre, data.fichier, data.citoyen.pk]
        );

        return new Document(db, {
            id:      res.stmt.lastID,
            titre:   data.titre, fichier: data.fichier,
            citoyen: data.citoyen.login,
        });
    }

    static async getById(db: Database, id: number): Promise<?Document> {
        return await Document.get(db,
            "select * from document where id = ?", [id],
            (data) => new Document(db, data)
        );
    }

    static async allByCitoyen(db: Database, citoyen: Citoyen): Promise<Array<Document>> {
        return await Document.all(db,
            "select * from document where citoyen = ?", [citoyen.login],
            (data) => new Document(db, data)
        );
    }

    // Méthode
    async save(): Promise<void> {
        await this.db.run(
            "update document set titre=?, fichier=?, citoyen=? where id=?",
            [this.titre, this.#fichier, this.citoyen.pk, this.id]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from document where id=?", [this.id]
        );

        if (this.#fichier === "") return;

        // Suppression du fichier
        const p = path.join(MEDIA_PATH, this.#fichier);

        fs.exists(p, exists => {
            if (exists) {
                fs.unlink(p, (err) => {
                    if (err) console.error(`While deleting ${this.#fichier}`, err);
                });
            }
        });
    }
}