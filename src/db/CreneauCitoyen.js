// @flow
// Méthodes
import type { Database } from "sqlite";
import Creneau from './Creneau'
import Citoyen from './Citoyen'

// Classe
export default class CreneauCitoyen extends Creneau {
    // Constructeur
    constructor(db: Database, { id, debut, fin, repetitions, ecart, citoyen }: { id: number, debut: string, fin: string, repetitions: number, ecart: string, citoyen: string }, fields: any = {}) {
        super(db, { id, debut, fin, repetitions, ecart }, fields);

        // Remplissage
        this.#loginCitoyen = citoyen;
    }

    // Méthodes statiques
    static async get(db: Database, id: number): Promise<?CreneauCitoyen> {
        // Recupération
        const data = await db.get("select * from creneau_citoyen where id = ?", id);

        if (data) {
            return new CreneauCitoyen(db, data);
        } else {
            return null;
        }
    }

    static async getForCitoyen(db: Database, citoyen: Citoyen | string): Promise<Array<CreneauCitoyen>> {
        // Récupération
        if (citoyen instanceof Citoyen) {
            citoyen = citoyen.login;
        }

        const data = await db.all("select * from creneau_citoyen where citoyen = ? order by debut", citoyen);
        return data.map((d) => new CreneauCitoyen(db, d));
    }

    // Méthodes
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