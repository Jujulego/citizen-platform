// @flow
// Importations
import Document from "../../src/db/Document";
import { database } from "../database";
import Citoyen from "../../src/db/Citoyen";

// Tests
describe("Document", function() {
    // Tests
    test("create/update/delete", async function() {
        // Get citoyen
        const cit = await Citoyen.getByLogin(database, "charleslegrand@carolingiens.fr");
        expect(cit).not.toBeNull();
        if (cit == null) return;

        // Create
        const doc = await Document.create(database, {
            titre: "Test",
            fichier: "",
            citoyen: cit
        });

        const doc2 = await Document.getById(database, doc.id);
        expect(doc2).not.toBeNull();

        // Update
        doc.titre = "Super Test";
        await doc.save();

        const doc3 = await Document.getById(database, doc.id);
        expect(doc3).not.toBeNull();

        if (doc3 != null) {
            expect(doc3.titre).toBe("Super Test");
        }

        // Delete
        await doc.delete();

        const doc4 = await Document.getById(database, doc.id);
        expect(doc4).toBeNull();
    });
});