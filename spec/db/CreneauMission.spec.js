// @flow
// Importations
import CreneauMission from "../../src/db/CreneauMission";
import { database } from "../database";

// Tests
describe("CreneauMission", function() {
    // Tests
    test("get", async function() {
        const cre = await CreneauMission.get(database, 1);

        expect(cre).not.toBeNull();

        if (cre != null) {
            expect(cre instanceof CreneauMission).toBe(true);
            expect(cre.repetitions).toBe(1);
        }
    });
});