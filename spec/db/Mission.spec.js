// @flow
// Importations
import Mission from "../../src/db/Mission";
import { database } from "../database";

// Tests
describe("Mission", function() {
    // Tests
    test("get", async function() {
        const mission = await Mission.get(database, 1);

        expect(mission).not.toBeNull();

        if (mission != null) {
            expect(mission instanceof Mission).toBe(true);
            expect(mission.titre).toBe("Mission 1");
        }
    });
});