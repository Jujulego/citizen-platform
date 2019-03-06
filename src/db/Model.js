// Classe
class Model {
    // Champ
    db;
    fields;

    // Constructeur
    constructor(db, fields = {}) {
        this.db = db;
        this.fields = fields;
    }
}

export default Model;