// @flow
// Importations
import type { Database } from "sqlite";

import Model from './Model';
import Association from './Association';
import CreneauMission from './CreneauMission';
import Postulation from "./Postulation";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";

// Classe
export default class Mission extends Model {
    // Attributs
    titre: string;
    description: string;
    lieu: string;
    nbPersAtteindre: number;
    association: ForeignKey<Association>;

    // Propriétés
    #id: number;
    get id(): number { return this.#id; }

    // Constructeur
    constructor(db: Database, data: { idMission: number, titre: string, lieu: string, description: string, loginAsso: string, nbPersAtteindre: number }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#id   = data.idMission;
        this.titre = data.titre;
        this.lieu  = data.lieu;
        this.description = data.description;
        this.nbPersAtteindre = data.nbPersAtteindre;
        this.association = new ForeignKey<Association>(data.loginAsso, (pk) => Association.get(db, pk));
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?Mission> {
        // Récupération
        const data = await db.get("select * from mission where idMission = ?", id);

        if (data) {
            return new Mission(db, data);
        } else {
            return null;
        }
    }

    static async getForAsso(db: Database, asso: Association | string): Promise<Array<Mission>> {
        if (asso instanceof Association) {
            asso = asso.login;
        }

        // Récupération
        const data = await db.all("select * from mission where loginAsso = ?", asso);
        return data.map((d) => new Mission(db, d));
    }

    static async getWhereAsso(db: Database, id: number, asso: Association | string): Promise<?Mission> {
        if (asso instanceof Association) {
            asso = asso.login;
        }

        // Récupération
        const data = await db.get("select * from mission where idMission = ? and loginAsso = ?", id, asso);

        if (data) {
            return new Mission(db, data);
        } else {
            return null;
        }
    }

    static async nextMissions(db: Database, nb: number = 5): Promise<Array<Mission>> {
        // Récupération
        const data = await db.all(
            "select idMission, titre, lieu, description, nbPersAtteindre, loginAsso, min(cm.debut) as dateMission\n" +
            "  from mission as m\n" +
            "    inner join creneau_mission as cm on m.idMission = cm.mission and cm.debut >= date('now')\n" +
            "  group by titre, lieu, description\n" +
            "  order by dateMission\n" +
            "  limit ?", nb);

        return data.map((mission) => new Mission(db, mission, { dateMission: mission.dateMission }));
    }

    // Méthodes
    async getCreneaux(): Promise<Array<CreneauMission>> {
        return await CreneauMission.getForMission(this.db, this);
    }

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.getForMission(this.db, this);
    }

    async getPostulants(): Promise<Array<{ postulant: Citoyen, creneau: CreneauMission }>> {
        const postulations = await this.getPostulations();

        const result = [];
        for (const p of postulations) {
            result.push({
                postulant: await p.getCitoyen(),
                creneau:   await p.getCreneau()
            });
        }

        return result;
    }
}