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
        return new Citoyen(db, data);
    }

    // Méthodes
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