// @flow
// Importations
import DomaineIntervention from "../../src/db/DomaineIntervention";
import { database } from "../database";
import Citoyen from "../../src/db/Citoyen";

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

    test("create/update/delete", async function() {
        // Get citoyen
        const cit = await Citoyen.getByLogin(database, "charleslegrand@carolingiens.fr");
        expect(cit).not.toBeNull();
        if (cit == null) return;

        // Create
        const dom = await DomaineIntervention.create(database, {
            nom: "Test",
            citoyen: cit
        });

        const dom2 = await DomaineIntervention.getById(database, dom.id);
        expect(dom2).not.toBeNull();

        // Update
        dom.nom = "Super Test";
        await dom.save();

        const dom3 = await DomaineIntervention.getById(database, dom.id);
        expect(dom3).not.toBeNull();

        if (dom3 != null) {
            expect(dom3.nom).toBe("Super Test");
        }

        // Delete
        await dom.delete();

        const dom4 = await DomaineIntervention.getById(database, dom.id);
        expect(dom4).toBeNull();
    });
});