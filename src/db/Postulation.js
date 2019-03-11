// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import CreneauMission from "./CreneauMission";
import Mission from "./Mission";
import ForeignKey from "./ForeignKey";

// Classe
export default class Postulation extends Model {
    // Attributs
    citoyen: ForeignKey<Citoyen>;
    creneau: ForeignKey<CreneauMission>;

    // Constructeur
    constructor(db: Database, data: { creneau: number, citoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.citoyen = new ForeignKey<Citoyen>(data.citoyen, (pk) => Citoyen.get(db, pk));
        this.creneau = new ForeignKey<CreneauMission>(data.creneau, (pk) => CreneauMission.get(db, pk));
    }

    // Méthodes statiques
    static async getForCreneau(db: Database, creneau: CreneauMission | number): Promise<Array<Postulation>> {
        // Récupération
        if (creneau instanceof CreneauMission) {
            creneau = creneau.id;
        }

        const data = await db.all("select * from postulation where creneau = ?", creneau);
        return data.map((d) => new Postulation(db, d));
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<Postulation>> {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from postulation where citoyen = ?", citoyen);
        return data.map((d) => new Postulation(db, d));
    }

    static async getForMission(db: Database, mission: Mission | number): Promise<Array<Postulation>> {
        // Récupération
        if (mission instanceof Mission) {
            mission = mission.id;
        }

        const data = await db.all("select creneau, citoyen from postulation p inner join creneau_mission cm on p.creneau = cm.id where cm.mission = ?", mission);
        return data.map((d) => new Postulation(db, d));
    }
}