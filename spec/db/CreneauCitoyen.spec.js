// @flow
// Importations
import CreneauCitoyen from "../../src/db/CreneauCitoyen";
import { database } from "../database";

// Tests
describe("CreneauCitoyen", function() {
    // Tests
    test("get", async function() {
        const cre = await CreneauCitoyen.get(database, 1);

        expect(cre).not.toBeNull();

        if (cre != null) {
            expect(cre instanceof CreneauCitoyen).toBe(true);
            expect(cre.repetitions).toBe(13);
        }
    });
});