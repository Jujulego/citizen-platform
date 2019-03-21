// @flow
// Importations
import CreneauCitoyen from "../../src/db/CreneauCitoyen";
import { database } from "../database";
import Citoyen from "../../src/db/Citoyen";

// Tests
describe("CreneauCitoyen", function() {
    // Tests
    test("get", async function() {
        const cre = await CreneauCitoyen.getById(database, 1);

        expect(cre).not.toBeNull();

        if (cre != null) {
            expect(cre instanceof CreneauCitoyen).toBe(true);
            expect(cre.repetitions).toBe(13);
        }
    });

    test("create/update/delete", async function() {
        // Get citoyen
        const cit = await Citoyen.getByLogin(database, "charleslegrand@carolingiens.fr");
        expect(cit).not.toBeNull();
        if (cit == null) return;

        // Create
        const cre = await CreneauCitoyen.create(database, {
            debut: new Date(),
            fin: new Date(),
            repetitions: 1,
            ecart: 1,
            citoyen: cit
        });

        const cre2 = await CreneauCitoyen.getById(database, cre.id);
        expect(cre2).not.toBeNull();

        // Update
        cre.repetitions = 2;
        await cre.save();

        const cre3 = await CreneauCitoyen.getById(database, cre.id);
        expect(cre3).not.toBeNull();

        if (cre3 != null) {
            expect(cre3.repetitions).toBe(2);
        }

        // Delete
        await cre.delete();

        const cre4 = await CreneauCitoyen.getById(database, cre.id);
        expect(cre4).toBeNull();
    });
});