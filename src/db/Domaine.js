// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Mission from "./Mission";

// Classe
export default class Domaine extends Model<Domaine> {
    // Attributs
    nom: string;

    // Propriétés
    #id: number;
    get id(): number { return this.#id }

    // Constructeur
    constructor(db: Database, data: { id: number, nom: string }, fields: any = {}) {
        super(db, data.id, fields);

        // Méthodes
        this.#id = data.id;
        this.nom = data.nom;
    }

    // Méthodes statiques
    static async create(db: Database, data: { nom: string }): Promise<Domaine> {
        const res = await db.run(
            "insert into domaine(id, nom) values (null, ?)", [data.nom]
        );

        return new Domaine(db, {
            id: res.stmt.lastID,
            nom: data.nom
        });
    }

    static async getById(db: Database, id: number): Promise<?Domaine> {
        return await Domaine.get(db,
            "select * from domaine where id = ?", [id],
            (data) => new Domaine(db, data)
        );
    }

    static async getByNom(db: Database, nom: string): Promise<?Domaine> {
        return await Domaine.get(db,
            "select * from domaine where nom = ?", [nom],
            (data) => new Domaine(db, data)
        );
    }

    static async allByMission(db: Database, mission: Mission): Promise<Array<Domaine>> {
        return await Domaine.all(db,
            "select distinct d.* from domaine d inner join domaine_mission dm on d.id = dm.domaine where dm.mission = ?", [mission.id],
            (data) => new Domaine(db, data)
        );
    }

    // Méthodes
    async save(): Promise<void> {
        await this.db.run(
            "update domaine set nom=? where id=?",
            [this.nom, this.id]
        );
    }

    async delete(): Promise<void> {
        await this.db.run(
            "delete from domaine where id=?", [this.id]
        )
    }

    async getMissions(): Promise<Array<Mission>> {
        return Mission.allByDomaine(this.db, this);
    }
    async linkMission(mission: Mission): Promise<void> {
        await this.db.run(
            "insert into domaine_mission(domaine, mission) values (?, ?)",
            [this.id, mission.id]
        )
    }
    async unlinkMission(mission: Mission): Promise<void> {
        await this.db.run(
            "delete from domaine_mission where domaine=? and mission=?",
            [this.id, mission.id]
        )
    }
}
