// @flow
// Importations
import Document from "../../src/db/Document";
import { database } from "../database";

// Tests
describe("Document", function() {
    // Tests
    test("get", async function() {
        const doc = await Document.getById(database, 1);

        expect(doc).not.toBeNull();

        if (doc != null) {
            expect(doc instanceof Document).toBe(true);
            expect(doc.titre).toBe("Lettre de mativation");
        }
    });
});