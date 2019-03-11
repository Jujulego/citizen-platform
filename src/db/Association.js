// @flow
// Importations
import type { Database } from "sqlite";
import type { $Request } from "express";

import Model from './Model';
import Mission from "./Mission";

// Classe
export default class Association extends Model {
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
    constructor(db: Database, { loginAsso, mdpAsso, nom, presentation, adresse, mail, tel, siteWeb, siret }: { loginAsso: string, mdpAsso: string, nom: string, presentation: string, adresse: string, mail: string, tel: string, siteWeb: string, siret: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#login = loginAsso;
        this.#mdp  = mdpAsso;
        this.nom   = nom;
        this.presentation = presentation;
        this.adresse = adresse;
        this.mail  = mail;
        this.tel   = tel;
        this.siteWeb = siteWeb;
        this.siret = siret;
    }

    // Méthodes statiques
    static async get(db: Database, login: string): Promise<?Association> {
        const data = await db.get("select * from association where loginAsso = ?", login);

        if (data) {
            return new Association(db, data);
        } else {
            return null;
        }
    }

    static async authenticate(db: Database, req: $Request, { login, mdp }: { login: string, mdp: string }): Promise<?Association> {
        const data = await db.get("select * from association where loginAsso = ? and mdpAsso = ?", [login, mdp]);

        if (data) {
            req.session.assoLogin = login;
            req.session.connected = true;
            req.asso = new Association(db, data);

            return req.asso;
        } else {
            return null;
        }
    }

    static async getLoggedInUser(db: Database, req: $Request): Promise<?Association> {
        // Déjà récupéré ?
        if (req.asso) return req.asso;

        // Récupération
        if (req.session.connected && req.session.assoLogin) {
            const asso = await Association.get(db, req.session.assoLogin);
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
    async getMission(id: number): Promise<?Mission> {
        return await Mission.getWhereAsso(this.db, id, this);
    }

    async getMissions(): Promise<Array<Mission>> {
        return await Mission.getForAsso(this.db, this);
    }
}