// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";

// Classe
export default class ForeignKey<T: Model> {
    // Attributs
    #instance: ?T;
    model_get: (any) => Promise<?T>;

    // Propriétés
    #pk: any;
    get pk() { return this.#pk; }
    set pk(pk: any) {
        this.#pk = pk;
        this.#instance = null;
    }

    // Constructeur
    constructor(pk: any, model_get: (any) => Promise<?T>, instance: ?T = null) {
        this.#pk = pk;
        this.model_get = model_get;
        this.#instance = instance;
    }

    // Méthodes
    async get(): Promise<?T> {
        if (this.#instance == null) {
            this.#instance = await this.model_get(this.#pk);
        }

        return this.#instance;
    }

    set(obj: T) {
        this.#pk = obj.pk;
        this.#instance = obj
    }
}