// @flow
// Importations
import type { Database } from "sqlite";

import Creneau from "./Creneau";
import Mission from "./Mission";
import Postulation from "./Postulation";
import ForeignKey from "./ForeignKey";

// Classe
export default class CreneauMission extends Creneau {
    // Attributs
    mission: ForeignKey<Mission>;

    // Constructeur
    constructor(db: Database, data:  { id: number, debut: string, fin: string, repetitions: number, ecart: string, mission: number }, fields: any = {}) {
        super(db, data, fields);

        // Remplissage
        this.mission = new ForeignKey<Mission>(data.mission, (pk) => Mission.get(db, pk));
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
    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.getForCreneau(this.db, this);
    }
}