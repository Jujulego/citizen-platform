// @flow
// Importations
import DomaineIntervention from "../../src/db/DomaineIntervention";
import { database } from "../database";

// Tests
describe("DomaineIntervention", function() {
    // Tests
    test("get", async function() {
        const dom = await DomaineIntervention.getById(database, 1);

        expect(dom).not.toBeNull();

        if (dom != null) {
            expect(dom instanceof DomaineIntervention).toBe(true);
            expect(dom.nom).toBe("Enseignement");
        }
    });
});