// Importations
import Model from './model'

// Classe
class Creneau extends Model {
    // Attributs
    debut;
    fin;
    repetitions; // 0 => infini
    ecart;       // entre 2 répétitions

    // Propriétés
    #id;
    get id() { return this.#id; }

    // Constructeur
    constructor(db, { id, debut, fin, repetitions, ecart }, fields = {}) {
        super(db, fields);

        // Remplissage
        this.#id = id;
        this.debut = debut;
        this.fin = fin;
        this.repetitions = repetitions;
        this.ecart = ecart;
    }
}

export default Creneau;