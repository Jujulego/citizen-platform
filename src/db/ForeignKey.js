// @flow
// Importations
import type { Database } from "sqlite";

import Model from "./Model";

// Classe
export default class ForeignKey<T: Model<*>> {
    // Attributs
    #instance: ?T;
    getter: (any) => Promise<?T>;

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
        this.getter = model_get;
        this.#instance = instance;
    }

    // Méthodes
    async get(): Promise<?T> {
        if (this.#instance == null) {
            this.#instance = await this.getter(this.#pk);
        }

        return this.#instance;
    }

    set(obj: T) {
        this.#pk = obj.pk;
        this.#instance = obj
    }
}