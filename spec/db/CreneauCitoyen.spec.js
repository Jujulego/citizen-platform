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
            debut: "01/01/2019 00:00:00",
            fin: "01/01/2019 01:00:00",
            repetitions: 1,
            ecart: "24:00:00",
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