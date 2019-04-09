// @flow
// Importations
import type { Database } from "sqlite";

import Creneau from "./Creneau";
import Mission from "./Mission";
import Postulation from "./Postulation";
import ForeignKey from "./ForeignKey";
import Association from "./Association";

// Classe
export default class CreneauMission extends Creneau<CreneauMission> {
    // Attributs
    mission: ForeignKey<Mission>;

    // Constructeur
    constructor(db: Database, data:  { id: number, debut: Date|string, fin: Date|string, repetitions: number, ecart: number, mission: number }, fields: any = {}) {
        super(db, data, fields);

        // Remplissage
        this.mission = new ForeignKey<Mission>(data.mission, (pk) => Mission.getById(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { debut: Date, fin: Date, repetitions: number, ecart: number, mission: Mission }): Promise<CreneauMission> {
        const debut = data.debut.toISOString().slice(0,-1);
        const fin   = data.fin.toISOString().slice(0,-1);

        const res = await db.run(
            "insert into creneau_mission values (null, ?, ?, ?, ?, ?)",
            [debut, fin, data.repetitions, data.ecart, data.mission.id]
        );

        return new CreneauMission(db, {
            id: res.stmt.lastID,
            debut: data.debut,
            fin: data.fin,
            repetitions: data.repetitions,
            ecart: data.ecart,
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

    static async allBetweenForMission(db: Database, start: Date, end: Date, mission: Mission): Promise<Array<CreneauMission>> {
        return await CreneauMission.all(db,
            "select * from creneau_mission where mission = ? and (? > debut and (repetitions = 0 or ? < coalesce(datetime(fin, '+' || (ecart * (repetitions - 1)) || ' days'), fin)))",
            [mission.id, end.toISOString().slice(0,-1), start.toISOString().slice(0,-1)],
            (data) => new CreneauMission(db, data)
        );
    }

    static async allBetweenForAssociation(db: Database, start: Date, end: Date, association: Association): Promise<Array<CreneauMission>> {
        return await CreneauMission.all(db,
            "select cm.* from creneau_mission as cm inner join mission as m on m.idMission = cm.mission where m.loginAsso = ? and (? > debut and (repetitions = 0 or ? < coalesce(datetime(fin, '+' || (ecart * (repetitions - 1)) || ' days'), fin)))",
            [association.login, end.toISOString().slice(0,-1), start.toISOString().slice(0,-1)],
            (data) => new CreneauMission(db, data)
        );
    }

    // Méthodes
    async save(): Promise<void> {
        const debut = this.debut.toISOString().slice(0,-1);
        const fin   = this.fin.toISOString().slice(0,-1);

        await this.db.run(
            "update creneau_mission set debut=?, fin=?, repetitions=?, ecart=?, mission=? where id=?",
            [debut, fin, this.repetitions, this.ecart, this.mission.pk, this.id]
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
