// @flow
// Importations
import type { Database } from "sqlite";

import sqlite from "sqlite";
import Promise from "bluebird";

// Vars
export let database: ?Database = null;

// Test setup
beforeAll(async function() {
    database = await sqlite.open("./db.sqlite", { Promise });
    await database.migrate();
});

afterAll(async function() {
    if (database != null) {
        await database.close();
    }
});