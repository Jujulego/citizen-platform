// @flow
// Importations
import Domaine from "../../src/db/Domaine";
import { database } from "../database";
import Citoyen from "../../src/db/Citoyen";

// Tests
describe("Domaine", function() {
    // Tests
    test("get", async function() {
        const dom = await Domaine.getById(database, 1);

        expect(dom).not.toBeNull();

        if (dom != null) {
            expect(dom instanceof Domaine).toBe(true);
            expect(dom.nom).toBe("Ecologie");
        }
    });

    test("getByNom", async function() {
        const dom = await Domaine.getByNom(database, "hfeuinjkvednvke");
        expect(dom).toBeNull();
    });

    test("create/update/delete", async function() {
        // Create
        const dom = await Domaine.create(database, {
            nom: "Test"
        });

        const dom2 = await Domaine.getById(database, dom.id);
        expect(dom2).not.toBeNull();

        // Update
        dom.nom = "Super Test";
        await dom.save();

        const dom3 = await Domaine.getById(database, dom.id);
        expect(dom3).not.toBeNull();

        if (dom3 != null) {
            expect(dom3.nom).toBe("Super Test");
        }

        // Delete
        await dom.delete();

        const dom4 = await Domaine.getById(database, dom.id);
        expect(dom4).toBeNull();
    });
});
