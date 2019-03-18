// @flow
// Importations
import Competance from "../../src/db/Competance";
import { database } from "../database";
import Citoyen from "../../src/db/Citoyen";

// Tests
describe("Competance", function() {
    // Tests
    test("get", async function() {
        const comp = await Competance.getById(database, 1);

        expect(comp).not.toBeNull();
        if (comp == null) return;

        expect(comp instanceof Competance).toBe(true);
        expect(comp.nom).toBe("Management");

        // fk
        const cit = await comp.citoyen.get();
        expect(cit).not.toBeNull();

        if (cit != null) {
            expect(cit.login).toBe("premierempire@jesuislemeilleur.fr");
        }
    });

    test("create/update/delete", async function() {
        // Get citoyen
        const cit = await Citoyen.getByLogin(database, "charleslegrand@carolingiens.fr");
        expect(cit).not.toBeNull();
        if (cit == null) return;

        // Create
        const comp = await Competance.create(database, {
            nom: "Test",
            description: "Test",
            citoyen: cit
        });

        const comp2 = await Competance.getById(database, comp.id);
        expect(comp2).not.toBeNull();

        // Update
        comp.nom = "Super Test";
        await comp.save();

        const comp3 = await Competance.getById(database, comp.id);
        expect(comp3).not.toBeNull();

        if (comp3 != null) {
            expect(comp3.nom).toBe("Super Test");
        }

        // Delete
        await comp.delete();

        const comp4 = await Competance.getById(database, comp.id);
        expect(comp4).toBeNull();
    });
});