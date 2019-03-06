// Importations
import Model from './model';
import Competance from "./Competance";
import CreneauCitoyen from "./CreneauCitoyen";
import Document from "./Document";
import DomaineIntervention from "./DomaineIntervention";
import Postulation from "./Postulation";

// Classe
class Citoyen extends Model {
    // Attribtus
    #mdp;
    nom;
    prenom;
    adresse;
    tel;
    situation;
    permis;

    // Propriétés
    #login;
    get login() { return this.#login; }

    // Constructeur
    constructor(db, { loginCitoyen, mdpCitoyen, nom, prenom, adresse, tel, situation, permis }, fields = {}) {
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
    static async get(db, login) {
        // Récupération
        const data = await db.get("select * from citoyen where loginCitoyen = ?", login);

        if (data) {
            return new Citoyen(db, data);
        } else {
            return null;
        }
    }

    static async authenticate(db, req, { login, mdp }) {
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

    static async getLoggedInUser(db, req) {
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

    // Méthodes
    disconnect(req) {
        req.session.connected = false;
        req.session.userLogin = undefined;
        req.user = undefined;
    }

    async getCompetances() {
        return await Competance.getForCitoyen(this.db, this);
    }

    async getCreneaux() {
        return await CreneauCitoyen.getForCitoyen(this.db, this);
    }

    async getDocuments() {
        return await Document.getForCitoyen(this.db, this);
    }

    async getDomainesIntervention() {
        return await DomaineIntervention.getForCitoyen(this.db, this);
    }

    async getPostulations() {
        return await Postulation.getForCitoyen(this.db, this);
    }
}

export default Citoyen;