// Importations
import Model from './Model';
import Mission from "./Mission";

// Classe
class Association extends Model {
    // Attributs
    #mdp;  // => privé
    nom; presentation;
    adresse; mail; tel; siteWeb; siret;

    // Propriétés
    #login;
    get login() { return this.#login }

    // Constructeur
    constructor(db, { loginAsso, mdpAsso, nom, presentation, adresse, mail, tel, siteWeb, siret }, fields = {}) {
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
    static async get(db, login) {
        const data = await db.get("select * from association where loginAsso = ?", login);

        if (data) {
            return new Association(db, data);
        } else {
            return null;
        }
    }

    static async authenticate(db, req, { login, mdp }) {
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

    static async getLoggedInUser(db, req) {
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

    // Méthodes
    disconnect(req) {
        req.session.connected = false;
        req.session.assoLogin = undefined;
        req.asso = undefined;
    }

    async getMission(id) {
        return await Mission.getWhereAsso(this.db, id, this);
    }

    async getMissions() {
        return await Mission.getForAsso(this.db, this);
    }
}

export default Association;