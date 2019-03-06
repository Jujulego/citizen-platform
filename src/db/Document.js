// Importations
import Citoyen from "./Citoyen";
import Model from "./Model";

// Classe
class Document extends Model {
    // Attributs
    titre;
    lien;

    // Propriétés
    #id;
    get id() { return this.#id; }

    // Constructeur
    constructor(db, { idDocument, titre, lien, loginCitoyen }, fields = {}) {
        super(db, fields);

        // Remplissage
        this.#id = idDocument;
        this.titre = titre;
        this.lien = lien;
        this.#loginCitoyen = loginCitoyen;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Récupération
        const data = await db.get("select * from document where idDocument = ?", id);
        return new Document(db, data);
    }

    static async getForCitoyen(db, citoyen) {
        // Recupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from document where loginCitoyen = ?", citoyen);
        return data.map((d) => new Document(db, d));
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

export default Document;