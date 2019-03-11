// @flow
// Importations
import type { Database } from "sqlite";
import type { $Request } from "express";

import Model from './Model';
import Competance from "./Competance";
import CreneauCitoyen from "./CreneauCitoyen";
import Document from "./Document";
import DomaineIntervention from "./DomaineIntervention";
import Postulation from "./Postulation";

// Classe
export default class Citoyen extends Model {
    // Attribtus
    #mdp: string;
    nom: string;
    prenom: string;
    adresse: string;
    tel: string;
    situation: string;
    permis: boolean;

    // Propriétés
    #login: string;
    get login(): string { return this.#login; }

    // Constructeur
    constructor(db: Database, { loginCitoyen, mdpCitoyen, nom, prenom, adresse, tel, situation, permis }: { loginCitoyen: string, mdpCitoyen: string, nom: string, prenom: string, adresse: string, tel: string, situation: string, permis: boolean }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#login = loginCitoyen;
        this.#mdp   = mdpCitoyen;
        this.nom    = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.tel    = tel;
        this.situation = situation;
        this.permis = permis;
    }

    // Méthodes statiques
    static async get(db: Database, login: string): Promise<?Citoyen> {
        // Récupération
        const data = await db.get("select * from citoyen where loginCitoyen = ?", login);

        if (data) {
            return new Citoyen(db, data);
        } else {
            return null;
        }
    }

    static async authenticate(db: Database, req: $Request, { login, mdp }: { login: string, mdp: string }): Promise<?Citoyen> {
        // Récupération
        const data = await db.get("select * from citoyen where loginCitoyen = ? and mdpCitoyen = ?", [login, mdp]);

        if (data) {
            req.session.userLogin = login;
            req.session.connected = true;
            req.user = new Citoyen(db, data);

            return req.user;
        } else {
            return null;
        }
    }

    static async getLoggedInUser(db: Database, req: $Request): Promise<?Citoyen> {
        // Déjà récupéré ?
        if (req.user) return req.user;

        // Récupération
        if (req.session.connected && req.session.userLogin) {
            const user = await Citoyen.get(db, req.session.userLogin);
            if (user) req.user = user;

            return user;
        }

        return null;
    }

    static disconnect(req: $Request) {
        req.session.connected = false;
        req.session.userLogin = undefined;
        req.user = undefined;
    }

    // Méthodes
    async getCompetances(): Promise<Array<Competance>> {
        return await Competance.getForCitoyen(this.db, this);
    }

    async getCreneaux(): Promise<Array<CreneauCitoyen>> {
        return await CreneauCitoyen.getForCitoyen(this.db, this);
    }

    async getDocuments(): Promise<Array<Document>> {
        return await Document.getForCitoyen(this.db, this);
    }

    async getDomainesIntervention(): Promise<Array<DomaineIntervention>> {
        return await DomaineIntervention.getForCitoyen(this.db, this);
    }

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.getForCitoyen(this.db, this);
    }
}