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
export default class Mission extends Model<Mission> {
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
        this.association = new ForeignKey<Association>(data.loginAsso, (pk) => Association.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async getById(db: Database, id: number): Promise<?Mission> {
        return await Mission.get(db,
            "select * from mission where idMission = ?", [id],
            (data) => new Mission(db, data)
        );
    }

    static async allByAsso(db: Database, asso: Association): Promise<Array<Mission>> {
        return await Mission.all(db,
            "select * from mission where loginAsso = ?", [asso.login],
            (data) => new Mission(db, data)
        );
    }

    static async getByIdAndAsso(db: Database, id: number, asso: Association): Promise<?Mission> {
        return await Mission.get(db,
            "select * from mission where idMission = ? and loginAsso = ?", [id, asso.login],
            (data) => new Mission(db, data)
        );
    }

    static async nextMissions(db: Database, nb: number = 5): Promise<Array<Mission>> {
        return await Mission.all(db,
            "select idMission, titre, lieu, description, nbPersAtteindre, loginAsso, min(cm.debut) as dateMission\n" +
            "  from mission as m\n" +
            "    inner join creneau_mission as cm on m.idMission = cm.mission and cm.debut >= date('now')\n" +
            "  group by titre, lieu, description\n" +
            "  order by dateMission\n" +
            "  limit ?", [nb],
            (data) => new Mission(db, data, { dateMission: data.dateMission })
        );
    }

    // Méthodes
    async getCreneaux(): Promise<Array<CreneauMission>> {
        return await CreneauMission.allByMission(this.db, this);
    }

    async getPostulations(): Promise<Array<Postulation>> {
        return await Postulation.allByMission(this.db, this);
    }

    async getPostulants(): Promise<Array<{ postulant: ?Citoyen, creneau: ?CreneauMission }>> {
        const postulations: Array<Postulation> = await this.getPostulations();

        const result = [];
        for (const p of postulations) {
            result.push({
                postulant: await p.citoyen.get(),
                creneau:   await p.creneau.get()
            });
        }

        return result;
    }
}