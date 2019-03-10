// @flow
// Méthodes
import type { Database } from "sqlite";

import Creneau from './Creneau';
import Mission from './Mission';
import Postulation from "./Postulation";

// Classe
export default class CreneauMission extends Creneau {
    // Constructeur
    constructor(db: Database, { id, debut, fin, repetitions, ecart, mission }:  { id: number, debut: string, fin: string, repetitions: number, ecart: string, mission: number }, fields: any = {}) {
        super(db, { id, debut, fin, repetitions, ecart }, fields);

        // Remplissage
        this.#idMission = mission;
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?CreneauMission> {
        // Recupération
        const data = await db.get("select * from creneau_mission where id = ?", id);

        if (data) {
            return new CreneauMission(db, data);
        } else {
            return null;
        }
    }

    static async getForMission(db: Database, mission: Mission | number): Promise<Array<CreneauMission>> {
        // Récupération
        if (mission instanceof Mission) {
            mission = mission.id;
        }

        const data = await db.all("select * from creneau_mission where mission = ? order by debut", mission);
        return data.map((d) => new CreneauMission(db, d));
    }

    // Méthodes
    #idMission: number; #mission: ?Mission = null;
    async getMission(): Promise<Mission> {
        // Récupération de l'association
        if (!this.#mission) {
            this.#mission = await Mission.get(this.db, this.#idMission);
        }

        return this.#mission;
    }

    setMission(mission: Mission | number) {
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

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.getForCreneau(this.db, this);
    }
}