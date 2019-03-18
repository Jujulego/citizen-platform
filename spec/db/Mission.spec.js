// @flow
// Importations
import Mission from "../../src/db/Mission";
import { database } from "../database";
import Association from "../../src/db/Association";

// Tests
describe("Mission", function() {
    // Tests
    test("get", async function() {
        const mission = await Mission.getById(database, 1);

        expect(mission).not.toBeNull();

        if (mission != null) {
            expect(mission instanceof Mission).toBe(true);
            expect(mission.titre).toBe("Mission 1");
        }
    });

    test("create/update/delete", async function() {
        // Get citoyen
        const asso = await Association.getByLogin(database, "001");
        expect(asso).not.toBeNull();
        if (asso == null) return;

        // Create
        const mis = await Mission.create(database, {
            titre: "Test", description: "Test", lieu: "Test", nbPersAtteindre: 5,
            asso: asso
        });

        const mis2 = await Mission.getById(database, mis.id);
        expect(mis2).not.toBeNull();

        // Update
        mis.titre = "Super Test";
        await mis.save();

        const mis3 = await Mission.getById(database, mis.id);
        expect(mis3).not.toBeNull();

        if (mis3 != null) {
            expect(mis3.titre).toBe("Super Test");
        }

        // Delete
        await mis.delete();

        const mis4 = await Mission.getById(database, mis.id);
        expect(mis4).toBeNull();
    });
});