// Importations
import Model from "./Model"
import Citoyen from "./Citoyen"

// Classe
class Competance extends Model {
    // Attributs
    nom;
    description;

    // Propriétés
    #id;
    get id() { return this.#id; }

    // Constructeur
    constructor(db, { idCompetance, nom, description, loginCitoyen }, fields = {}) {
        super(db, fields);

        // Remplissage
        this.#id = idCompetance;
        this.nom = nom;
        this.description = description;
        this.#loginCitoyen = loginCitoyen;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Récupération
        const data = await db.get("select * from competance where idCompetance = ?", id);

        if (data) {
            return new Competance(db, data);
        } else {
            return null;
        }
    }

    static async getForCitoyen(db, citoyen) {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from competance where loginCitoyen = ?", citoyen);
        return data.map((d) => new Competance(db, d));
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

export default Competance;