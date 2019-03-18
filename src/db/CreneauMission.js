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
    static async create(db: Database, data: { debut: string, fin: string, repetitions: number, ecart: string, mission: Mission }): Promise<CreneauMission> {
        const res = await db.run(
            "insert into creneau_mission values (null, ?, ?, ?, ?, ?)",
            [data.debut, data.fin, data.repetitions, data.ecart, data.mission.id]
        );

        return new CreneauMission(db, {
            id: res.stmt.lastID,
            debut: data.debut, fin: data.fin, repetitions: data.repetitions, ecart: data.ecart,
            mission: data.mission.id
        });
    }

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
    async save(): Promise<void> {
        await this.db.run(
            "update creneau_mission set debut=?, fin=?, repetitions=?, ecart=?, mission=? where id=?",
            [this.debut, this.fin, this.repetitions, this.ecart, this.mission.pk, this.id]
        )
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from creneau_mission where id=?", [this.id]
        )
    }

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.allByCreneauMission(this.db, this);
    }
}