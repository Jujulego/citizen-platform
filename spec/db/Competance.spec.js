// @flow
// Importations
import Competance from "../../src/db/Competance";
import { database } from "../database";

// Tests
describe("Competance", function() {
    // Tests
    test("get", async function() {
        const comp = await Competance.get(database, 1);

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
});