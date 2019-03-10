// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";
import Citoyen from "./Citoyen";
import CreneauMission from "./CreneauMission";
import Mission from "./Mission";

// Classe
export default class Postulation extends Model {
    // Constructeur
    constructor(db: Database, { creneau, citoyen }: { creneau: number, citoyen: string }, fields: any = {}) {
        super(db, fields);

        // Remplissage
        this.#idCreneau = creneau;
        this.#loginCitoyen = citoyen;
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

    // Méthodes
    #idCreneau: number; #creneau: ?CreneauMission = null;
    async getCreneau(): Promise<CreneauMission> {
        // Récupération du citoyen
        if (!this.#creneau) {
            this.#creneau = await CreneauMission.get(this.db, this.#idCreneau);
        }

        return this.#creneau;
    }

    setCreneau(creneau: CreneauMission | number) {
        if (typeof creneau === "number") {
            if (creneau !== this.#idCreneau) {
                this.#idCreneau = creneau;
                this.#creneau = null;
            }
        } else if (creneau instanceof CreneauMission) {
            if (creneau.id === this.#idCreneau) {
                this.#idCreneau = creneau.id;
                this.#creneau = creneau;
            }
        }
    }

    #loginCitoyen: string; #citoyen: ?Citoyen = null;
    async getCitoyen(): Promise<Citoyen> {
        // Récupération du citoyen
        if (!this.#citoyen) {
            this.#citoyen = await Citoyen.get(this.db, this.#loginCitoyen);
        }

        return this.#citoyen;
    }

    setCitoyen(citoyen: Citoyen | string) {
        if (typeof citoyen === "string") {
            if (citoyen !== this.#loginCitoyen) {
                this.#loginCitoyen = citoyen;
                this.#citoyen = null;
            }
        } else if (citoyen instanceof Citoyen) {
            if (citoyen.login === this.#loginCitoyen) {
                this.#loginCitoyen = citoyen.login;
                this.#citoyen = citoyen;
            }
        }
    }
}