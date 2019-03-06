// Importations
import Model from './Model';
import Mission from "./Mission";

// Classe
class Association extends Model {
    // Attributs
    #mdp;  // => privé
    nom; presentation;
    adresse; mail; tel; siteWeb;

    // Propriétés
    #login;
    get login() { return this.#login }

    // Constructeur
    constructor(db, { loginAsso, mdpAsso, nom, presentation, adresse, mail, tel, siteWeb}, fields = {}) {
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

    // Méthodes
    async getMission(id) {
        return await Mission.getWhereAsso(this.db, id, this);
    }

    async getMissions() {
        return await Mission.getForAsso(this.db, this);
    }
}

export default Association;