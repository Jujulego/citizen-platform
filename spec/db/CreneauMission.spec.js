// @flow
// Importations
import { database } from "../database";
import CreneauMission from "../../src/db/CreneauMission";
import Mission from "../../src/db/Mission";

// Tests
describe("CreneauMission", function() {
    // Tests
    test("get", async function() {
        const cre = await CreneauMission.getById(database, 1);

        expect(cre).not.toBeNull();

        if (cre != null) {
            expect(cre instanceof CreneauMission).toBe(true);
            expect(cre.repetitions).toBe(1);
        }
    });

    test("create/update/delete", async function() {
        // Get citoyen
        const mis = await Mission.getById(database, 1);
        expect(mis).not.toBeNull();
        if (mis == null) return;

        // Create
        const cre = await CreneauMission.create(database, {
            debut: "01/01/2019 00:00:00",
            fin: "01/01/2019 01:00:00",
            repetitions: 1,
            ecart: "24:00:00",
            mission: mis
        });

        const cre2 = await CreneauMission.getById(database, cre.id);
        expect(cre2).not.toBeNull();

        // Update
        cre.repetitions = 2;
        await cre.save();

        const cre3 = await CreneauMission.getById(database, cre.id);
        expect(cre3).not.toBeNull();

        if (cre3 != null) {
            expect(cre3.repetitions).toBe(2);
        }

        // Delete
        await cre.delete();

        const cre4 = await CreneauMission.getById(database, cre.id);
        expect(cre4).toBeNull();
    });
});