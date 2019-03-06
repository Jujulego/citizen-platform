// Méthodes
import Creneau from './Creneau'
import Citoyen from './Citoyen'

// Classe
class CreneauCitoyen extends Creneau {
    // Constructeur
    constructor(db, { id, debut, fin, repetitions, ecart, citoyen }, fields = {}) {
        super(db, { id, debut, fin, repetitions, ecart }, fields);

        // Remplissage
        this.#loginCitoyen = citoyen;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Recupération
        const data = await db.get("select * from creneau_citoyen where id = ?", id);

        return new CreneauCitoyen(db, data);
    }

    static async getForCitoyen(db, citoyen) {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from creneau_citoyen where citoyen = ? order by debut", citoyen);
        return data.map((d) => new CreneauCitoyen(db, d));
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

export default CreneauCitoyen;