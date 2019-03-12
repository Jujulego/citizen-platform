// @flow
// Importations
import type { Database } from "sqlite";
import type { $Request } from "express";

import Model from './Model';
import Mission from "./Mission";

// Classe
export default class Association extends Model<Association> {
    // Attributs
    #mdp: string;  // => privé
    nom: string;
    presentation: string;
    adresse: string;
    mail: string;
    tel: string;
    siteWeb: string;
    siret: string;

    // Propriétés
    #login: string;
    get login(): string { return this.#login }

    // Constructeur
    constructor(db: Database, data: { loginAsso: string, mdpAsso: string, nom: string, presentation: string, adresse: string, mail: string, tel: string, siteWeb: string, siret: string }, fields: any = {}) {
        super(db, data.loginAsso, fields);

        // Remplissage
        this.#login = data.loginAsso;
        this.#mdp   = data.mdpAsso;
        this.nom    = data.nom;
        this.presentation = data.presentation;
        this.adresse = data.adresse;
        this.mail   = data.mail;
        this.tel    = data.tel;
        this.siteWeb = data.siteWeb;
        this.siret  = data.siret;
    }

    // Méthodes statiques
    static async create(db: Database, data: { loginAsso: string, mdpAsso: string, nom: string, presentation: string, adresse: string, mail: string, tel: string, siteWeb: string, siret: string }): Promise<Association> {
        await db.run(
            "insert into association values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [data.loginAsso, data.mdpAsso, data.nom, data.adresse, data.mail, data.tel, data.siteWeb, data.presentation, data.siret]
        );

        return new Association(db, data);
    }

    static async getByLogin(db: Database, login: string): Promise<?Association> {
        return await Association.get(db,
            "select * from association where loginAsso = ?", [login],
            (data) => new Association(db, data)
        );
    }

    static async authenticate(db: Database, req: $Request, { login, mdp }: { login: string, mdp: string }): Promise<?Association> {
        const asso = await Association.get(db,
            "select * from association where loginAsso = ? and mdpAsso = ?", [login, mdp],
            (data) => new Association(db, data)
        );

        if (asso) {
            req.session.assoLogin = login;
            req.session.connected = true;
            req.asso = asso;

            return asso;
        } else {
            return null;
        }
    }

    static async getLoggedInUser(db: Database, req: $Request): Promise<?Association> {
        // Déjà récupéré ?
        if (req.asso) return req.asso;

        // Récupération
        if (req.session.connected && req.session.assoLogin) {
            const asso = await Association.getByLogin(db, req.session.assoLogin);
            if (asso) req.asso = asso;

            return asso;
        }

        return null;
    }

    static disconnect(req: $Request) {
        req.session.connected = false;
        req.session.assoLogin = undefined;
        req.asso = undefined;
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update association set nom=?, presentation=?, adresse=?, mail=?, tel=?, siteWeb=?, siret=? where loginAsso=?",
            [this.nom, this.presentation, this.adresse, this.mail, this.tel, this.siteWeb, this.siret, this.login]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from association where loginAsso=?", [this.login]
        );
    }

    async getMission(id: number): Promise<?Mission> {
        return await Mission.getByIdAndAsso(this.db, id, this);
    }

    async getMissions(): Promise<Array<Mission>> {
        return await Mission.allByAsso(this.db, this);
    }
}