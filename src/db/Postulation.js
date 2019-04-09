// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import CreneauMission from "./CreneauMission";
import Mission from "./Mission";
import ForeignKey from "./ForeignKey";

// Classe
export default class Postulation extends Model<Postulation> {
    // Attributs
    citoyen: ForeignKey<Citoyen>;
    creneau: ForeignKey<CreneauMission>;
    status : boolean;

    // Constructeur
    constructor(db: Database, data: { creneau: number, citoyen: string, status: boolean }, fields: any = {}) {
        super(db, null, fields);

        // Remplissage
        this.citoyen = new ForeignKey<Citoyen>(data.citoyen, (pk) => Citoyen.getByLogin(db, pk));
        this.creneau = new ForeignKey<CreneauMission>(data.creneau, (pk) => CreneauMission.getById(db, pk));
        this.status = data.status;
    }

    // Méthodes statiques
    static async create(db: Database, data: {citoyen: Citoyen, creneau: CreneauMission, status: boolean }): Promise<Postulation> {
        const res = await db.run(
            "insert into postulation(creneau, citoyen, status) values (?, ?, ?)",
            [data.creneau.id, data.citoyen.login, data.status]
        );

        return new Postulation(db, {
            loginCitoyen: data.citoyen.login,
            idCreneau: data.creneau.id,
            status: data.status,
        });
    }

    static async getByCitoyenAndCreneau(db: Database, citoyen: Citoyen, id_creneau: number): Promise<?Postulation>{
        return await Postulation.get(db,
            "select * from postulation where creneau=? and citoyen=?",
            [id_creneau, citoyen.login], (data) => new Postulation(db, data)
        )
    }

    static async allByCreneauMission(db: Database, creneau: CreneauMission): Promise<Array<Postulation>> {
        return await Postulation.all(db,
            "select * from postulation where creneau = ?", [creneau.id],
            (data) => new Postulation(db, data)
        );
    }

    static async allByCitoyen(db: Database, citoyen: Citoyen): Promise<Array<Postulation>> {
        return await Postulation.all(db,
            "select * from postulation where citoyen = ?", [citoyen.login],
            (data) => new Postulation(db, data)
        );
    }

    static async allByMission(db: Database, mission: Mission): Promise<Array<Postulation>> {
        return await Postulation.all(db,
            "select creneau, citoyen, status from postulation p inner join creneau_mission cm on p.creneau = cm.id where cm.mission = ?", [mission.id],
            (data) => new Postulation(db, data)
        );
    }

    static async deletePostulation(db: Database, citoyen: Citoyen, id_creneau: number): Promise<void> {
        await db.run(
            "delete from postulation where creneau=? and citoyen=?", [id_creneau, citoyen.login]
        )
    }

    // Méthodes
    async delete(): Promise<void> {
        await this.db.run(
            "delete from postulation where creneau=? and citoyen=?", [this.creneau.pk, this.citoyen.pk]
        )
    }

    async save(): Promise<void> {
        await this.db.run(
            "update postulation set status=? where creneau=? and citoyen=?",
            [this.status, this.creneau.pk, this.citoyen.pk]
        )
    }
}
