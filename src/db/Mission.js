// @flow
// Importations
import type { Database } from "sqlite";

import Model from './Model';
import Association from './Association';
import CreneauMission from './CreneauMission';
import Postulation from "./Postulation";
import Citoyen from "./Citoyen";
import ForeignKey from "./ForeignKey";
import Domaine from "./Domaine";

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
        super(db, data.idMission, fields);

        // Remplissage
        this.#id   = data.idMission;
        this.titre = data.titre;
        this.lieu  = data.lieu;
        this.description = data.description;
        this.nbPersAtteindre = data.nbPersAtteindre;
        this.association = new ForeignKey<Association>(data.loginAsso, (pk) => Association.getByLogin(db, pk));
    }

    // Méthodes statiques
    static async create(db: Database, data: { titre: string, lieu: string, description: string, asso: Association, nbPersAtteindre: number }): Promise<Mission> {
        const res = await db.run(
            "insert into mission values (null, ?, ?, ?, ?, ?)",
            [data.nbPersAtteindre, data.description, data.lieu, data.asso.login, data.titre]
        );

        return new Mission(db, {
            idMission: res.stmt.lastID,
            titre: data.titre, lieu: data.lieu, description: data.description, nbPersAtteindre: data.nbPersAtteindre,
            loginAsso: data.asso.login
        });
    }

    static async getById(db: Database, id: number): Promise<?Mission> {
        return await Mission.get(db,
            "select * from mission where idMission = ?", [id],
            (data) => new Mission(db, data)
        );
    }

    static async getByIdAndAsso(db: Database, id: number, asso: Association): Promise<?Mission> {
        return await Mission.get(db,
            "select * from mission where idMission = ? and loginAsso = ?", [id, asso.login],
            (data) => new Mission(db, data)
        );
    }

    static async allByAsso(db: Database, asso: Association): Promise<Array<Mission>> {
        return await Mission.all(db,
            "select * from mission where loginAsso = ?", [asso.login],
            (data) => new Mission(db, data)
        );
    }

    static async allByDomaine(db: Database, domaine: Domaine): Promise<Array<Mission>> {
        return await Mission.all(db,
            "select distinct m.* from mission m inner join domaine_mission dm on m.idMission = dm.mission where dm.domaine = ?", [domaine.id],
            (data) => new Mission(db, data)
        );
    }

    static async nextMissions(db: Database, lieu: ?string, assos: ?string, dateDebut: ?string, domaine: ?string, keyword: ?string, nb: number = 5): Promise<Array<Mission>> {
        const where = [];
        const params = [];
        
        if (lieu) {
            where.push("lieu like ?");
            params.push("%" + lieu + "%");
        }

        if (assos) {
            where.push("a.nom like ?");
            params.push(`%${assos}%`);
        }

        if (dateDebut) {
            where.push("dateMission >= ?");
            params.push(dateDebut);
        }

        if (keyword) {
            where.push("(titre like ? or description like ?)");
            params.push(`%${keyword}%`);
            params.push(`%${keyword}%`);
        }

        if (domaine) {
            where.push("dm.domaine = ?");
            params.push(domaine)
        }
        
        //console.log(keyword);
        const sql = "select idMission, titre, lieu, description, nbPersAtteindre, m.loginAsso, min(cm.debut) as dateMission \n" +
            " from mission as m\n" +
            " inner join creneau_mission as cm on m.idMission = cm.mission and cm.debut >= date('now')\n" +
            " inner join association as a on m.loginAsso = a.loginAsso \n" +
            " left join domaine_mission as dm on m.idMission = dm.mission \n" +
            
            
            "  group by idMission, titre, lieu, description, nbPersAtteindre, m.loginAsso\n" +
            (where.length > 0 ? " having " + where.join(" and ") : "") +
            "  order by dateMission\n" +
            "  limit ?";

        return await Mission.all(db,
            //"select idMission, titre, lieu, description, nbPersAtteindre, m.loginAsso, min(cm.debut) as dateMission\n" +
            sql, [...params, nb],
            (data) => new Mission(db, data, { dateMission: data.dateMission })
        );
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update mission set titre=?, description=?, nbPersAtteindre=?, lieu=?, loginAsso=? where idMission=?",
            [this.titre, this.description, this.nbPersAtteindre, this.lieu, this.association.pk, this.id]
        )
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from mission where idMission=?", [this.id]
        )
    }

    async getDomaines(): Promise<Array<Domaine>> {
        return await Domaine.allByMission(this.db, this);
    }
    async linkDomaine(domaine: Domaine): Promise<void> {
        await this.db.run(
            "insert into domaine_mission(domaine, mission) values (?, ?)",
            [domaine.id, this.id]
        )
    }
    async unlinkDomaine(domaine: Domaine): Promise<void> {
        await this.db.run(
            "delete from domaine_mission where domaine=? and mission=?",
            [domaine.id, this.id]
        )
    }

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