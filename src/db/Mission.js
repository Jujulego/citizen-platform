// Importations
import Model from './Model';
import Association from './Association';
import CreneauMission from './CreneauMission';
import Postulation from "./Postulation";

// Classe
class Mission extends Model {
    // Attributs
    titre;
    description;
    lieu;
    nbPersAtteindre;

    // Propriétés
    #id;
    get id() { return this.#id; }

    // Constructeur
    constructor(db, { idMission, titre, lieu, description, loginAsso, nbPersAtteindre }, fields = {}) {
        super(db, fields);

        // Remplissage
        this.#id = idMission;
        this.titre = titre;
        this.lieu = lieu;
        this.description = description;
        this.#loginAsso = loginAsso;
        this.nbPersAtteindre = nbPersAtteindre;
    }

    // Méthodes statiques
    static async get(db, id) {
        // Récupération
        const data = await db.get("select * from mission where idMission = ?", id);

        if (data) {
            return new Mission(db, data);
        } else {
            return null;
        }
    }

    static async getForAsso(db, asso) {
        if (asso instanceof Association) {
            asso = asso.login;
        }

        // Récupération
        const data = await db.all("select * from mission where loginAsso = ?", asso);
        return data.map((d) => new Mission(db, d));
    }

    static async getWhereAsso(db, id, asso) {
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

    static async nextMissions(db, nb = 5) {
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
    #loginAsso; #asso = null;
    async getAssociation() {
        // Récupération de l'association
        if (!this.#loginAsso) {
            return null;
        } else if (!this.#asso) {
            this.#asso = await Association.get(this.db, this.#loginAsso);
        }

        return this.#asso;
    }

    setAssociation(asso) {
        if (typeof asso === "string") {
            if (asso !== this.#loginAsso) {
                this.#loginAsso = asso;
                this.#asso = null;
            }
        } else if (asso instanceof Association) {
            if (asso.login !== this.#loginAsso) {
                this.#loginAsso = asso.login;
                this.#asso = asso;
            }
        }
    }

    async getCreneaux() {
        return await CreneauMission.getForMission(this.db, this);
    }

    async getPostulations() {
        return await Postulation.getForMission(this.db, this.id);
    }

    async getPostulants() {
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

export default Mission;