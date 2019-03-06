// Importations
import Model from "./Model";
import Citoyen from "./Citoyen";
import CreneauMission from "./CreneauMission";
import Mission from "./Mission";

// Classe
class Postulation extends Model {
    // Constructeur
    constructor(db, { creneau, citoyen }, fields = {}) {
        super(db, fields);

        // Remplissage
        this.#idCreneau = creneau;
        this.#loginCitoyen = citoyen;
    }

    // Méthodes statiques
    static async getForCreneau(db, creneau) {
        // Récupération
        if (creneau instanceof CreneauMission) {
            creneau = creneau.id;
        }

        const data = await db.all("select * from postulation where creneau = ?", creneau);
        return data.map((d) => new Postulation(db, d));
    }

    static async getForCitoyen(db, citoyen) {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from postulation where citoyen = ?", citoyen);
        return data.map((d) => new Postulation(db, d));
    }

    static async getForMission(db, mission) {
        // Récupération
        if (mission instanceof Mission) {
            mission = mission.id;
        }

        const data = await db.all("select creneau, citoyen from postulation p inner join creneau_mission cm on p.creneau = cm.id where cm.mission = ?", mission);
        return data.map((d) => new Postulation(db, d));
    }

    // Méthodes
    #idCreneau; #creneau = null;
    async getCreneau() {
        // Récupération du citoyen
        if (!this.#idCreneau) {
            return null;
        } else if (!this.#creneau) {
            this.#creneau = await CreneauMission.get(this.db, this.#idCreneau);
        }

        return this.#creneau;
    }

    setCreneau(creneau) {
        if (typeof creneau === "number") {
            if (creneau !== this.#idCreneau) {
                this.#idCreneau = creneau;
                this.#creneau = null;
            }
        } else if (creneau instanceof CreneauMission) {
            if (creneau.id === this.#idCreneau) {
                this.#idCreneau = creneau.id;
                this.#creneau = creneau;
            }
        }
    }

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

export default Postulation;
