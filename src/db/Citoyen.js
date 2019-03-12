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
export default class Citoyen extends Model<Citoyen> {
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
    constructor(db: Database, data: { loginCitoyen: string, mdpCitoyen: string, nom: string, prenom: string, adresse: string, tel: string, situation: string, permis: boolean }, fields: any = {}) {
        super(db, data.loginCitoyen, fields);

        // Remplissage
        this.#login = data.loginCitoyen;
        this.#mdp   = data.mdpCitoyen;
        this.nom    = data.nom;
        this.prenom = data.prenom;
        this.adresse = data.adresse;
        this.tel    = data.tel;
        this.situation = data.situation;
        this.permis = data.permis;
    }

    // Méthodes statiques
    static async create(db: Database, data: { loginCitoyen: string, mdpCitoyen: string, nom: string, prenom: string, adresse: string, tel: string, situation: string, permis: boolean }): Promise<Citoyen> {
        await db.run(
            "insert into citoyen values (?, ?, ?, ?, ?, ?, ?, ?)",
            [data.loginCitoyen, data.mdpCitoyen, data.nom, data.prenom, data.adresse, data.tel, data.situation, data.permis]
        );

        return new Citoyen(db, data);
    }

    static async getByLogin(db: Database, login: string): Promise<?Citoyen> {
        // Récupération
        return await Citoyen.get(db,
            "select * from citoyen where loginCitoyen = ?", [login],
            (data) => new Citoyen(db, data)
        );
    }

    static async authenticate(db: Database, req: $Request, { login, mdp }: { login: string, mdp: string }): Promise<?Citoyen> {
        // Récupération
        const user = await Citoyen.get(db,
            "select * from citoyen where loginCitoyen = ? and mdpCitoyen = ?", [login, mdp],
            (data) => new Citoyen(db, data)
        );

        if (user) {
            req.session.userLogin = login;
            req.session.connected = true;
            req.user = user;

            return user;
        } else {
            return null;
        }
    }

    static async getLoggedInUser(db: Database, req: $Request): Promise<?Citoyen> {
        // Déjà récupéré ?
        if (req.user) return req.user;

        // Récupération
        if (req.session.connected && req.session.userLogin) {
            const user = await Citoyen.getByLogin(db, req.session.userLogin);
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
    async save(): Promise<void> {
        await this.db.run(
            "update citoyen set nom=?, prenom=?, adresse=?, tel=?, situation=?, permis=? where loginCitoyen=?",
            [this.nom, this.prenom, this.adresse, this.tel, this.situation, this.permis, this.login]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from citoyen where loginCitoyen=?", [this.login]
        );
    }

    async getCompetances(): Promise<Array<Competance>> {
        return await Competance.getForCitoyen(this.db, this);
    }

    async getCreneaux(): Promise<Array<CreneauCitoyen>> {
        return await CreneauCitoyen.allByCitoyen(this.db, this);
    }

    async getDocuments(): Promise<Array<Document>> {
        return await Document.allByCitoyen(this.db, this);
    }

    async getDomainesIntervention(): Promise<Array<DomaineIntervention>> {
        return await DomaineIntervention.allByCitoyen(this.db, this);
    }

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.allByCitoyen(this.db, this);
    }
}