// @flow
// Importations
import type { Database } from "sqlite";

import Creneau from "./Creneau";
import Mission from "./Mission";
import Postulation from "./Postulation";
import ForeignKey from "./ForeignKey";

// Classe
export default class CreneauMission extends Creneau<CreneauMission> {
    // Attributs
    mission: ForeignKey<Mission>;

    // Constructeur
    constructor(db: Database, data:  { id: number, debut: string, fin: string, repetitions: number, ecart: string, mission: number }, fields: any = {}) {
        super(db, data, fields);

        // Remplissage
        this.mission = new ForeignKey<Mission>(data.mission, (pk) => Mission.getById(db, pk));
    }

    // Méthodes statiques
    static async getById(db: Database, id: number): Promise<?CreneauMission> {
        return await CreneauMission.get(db,
            "select * from creneau_mission where id = ?", [id],
            (data) => new CreneauMission(db, data)
        );
    }

    static async allByMission(db: Database, mission: Mission): Promise<Array<CreneauMission>> {
        return await CreneauMission.all(db,
            "select * from creneau_mission where mission = ? order by debut", [mission.id],
            (data) => new CreneauMission(db, data)
        );
    }

    // Méthodes
    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.allByCreneauMission(this.db, this);
    }
}