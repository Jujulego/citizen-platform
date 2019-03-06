// Importations
import Model from "./Model"
import Citoyen from "./Citoyen";

// Classe
class DomaineIntervention extends Model {
    // Attributs
    nom;

    // Propriétés
    #id;
    get id() { return this.#id }

    // Constructeur
    constructor(db, { idDomaine, nom, loginCitoyen }, fields = {}) {
        super(db, fields);

        // Méthodes
        this.#id = idDomaine;
        this.nom = nom;
        this.#loginCitoyen = loginCitoyen;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Récupération
        const data = await db.get("select * from domaineIntervention where idDomaine = ?", id);
        return new DomaineIntervention(db, data);
    }

    static async getForCitoyen(db, citoyen) {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from domaineIntervention where loginCitoyen = ?", citoyen);
        return data.map((d) => new DomaineIntervention(db, d));
    }

    // Méthodes
    #loginCitoyen; #citoyen = null;
    async getCitoyen() {
        // Récupération du citoyen
        if (!this.#loginCitoyen) {
            return null;
        } else if (!this.#citoyen) {
            this.#citoyen = await Citoyen.get(this.db, this.#loginCitoyen);
        }

        return this.#citoyen;
    }

    setCitoyen(citoyen) {
        if (typeof citoyen === "string") {
            if (citoyen !== this.#loginCitoyen) {
                this.#loginCitoyen = citoyen;
                this.#citoyen = null;
            }
        } else if (citoyen instanceof Citoyen) {
            if (citoyen.login === this.#loginCitoyen) {
                this.#loginCitoyen = citoyen.login;
                this.#citoyen = citoyen;
            }
        }
    }
}

export default DomaineIntervention;