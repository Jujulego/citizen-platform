// Méthodes
import Creneau from './Creneau'
import Mission from './Mission'
import Postulation from "./Postulation";

// Classe
class CreneauMission extends Creneau {
    // Constructeur
    constructor(db, { id, debut, fin, repetitions, ecart, mission }, fields = {}) {
        super(db, { id, debut, fin, repetitions, ecart }, fields);

        // Remplissage
        this.#idMission = mission;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Recupération
        const data = await db.get("select * from creneau_mission where id = ?", id);
        return new CreneauMission(db, data);
    }

    static async getForMission(db, mission) {
        // Récupération
        if (mission instanceof Mission) {
            mission = mission.id;
        }

        const data = await db.all("select * from creneau_mission where mission = ? order by debut", mission);
        return data.map((d) => new CreneauMission(db, d));
    }

    // Méthodes
    #idMission; #mission;
    async getMission() {
        // Récupération de l'association
        if (!this.#idMission) {
            return null;
        } else if (!this.#mission) {
            this.#mission = await Mission.get(this.db, this.#idMission);
        }

        return this.#mission;
    }

    setMission(mission) {
        if (typeof mission === "number") {
            if (mission !== this.#idMission) {
                this.#idMission = mission;
                this.#mission = null;
            }
        } else if (mission instanceof Mission) {
            if (mission.login !== this.#mission) {
                this.#idMission = mission.login;
                this.#mission = mission;
            }
        }
    }

    async getPostulations() {
        return await Postulation.getForCreneau(this.db, this);
    }
}

export default CreneauMission;