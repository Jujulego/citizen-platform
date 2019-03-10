// @flow
// Importations
import Association from "../../src/db/Association";
import { database } from "../database"

// Tests
describe("Association", function() {
    // Tests
    test("get", async function() {
        const asso = await Association.get(database, "001");

        expect(asso).not.toBeNull();

        if (asso != null) {
            expect(asso instanceof Association).toBe(true);
            expect(asso.login).toBe("001");
        }
    });

    test("authenticate", async function() {
        const req = { session: {}, locals: {} };
        const cred = { login: "001", mdp: "cmmdp" };

        // Connexion
        const asso = await Association.authenticate(database, req, cred);

        expect(asso).not.toBeNull();
        if (asso == null) return;

        expect(asso.login).toBe(cred.login);

        expect(req.locals.asso).toEqual(asso);
        expect(req.session.assoLogin).toBe(cred.login);
        expect(req.session.connected).toBe(true);

        // Récup asso connectée
        // - depuis la db
        req.locals.asso = undefined;
        const asso2 = await Association.getLoggedInUser(database, req);

        expect(asso2).toEqual(asso);
        expect(req.locals.asso).toEqual(asso);

        // - depuis la req
        const asso3 = await Association.getLoggedInUser(database, req);
        expect(asso3).toEqual(asso);

        // Déconnexion
        asso.disconnect(req);

        expect(req.locals.asso).toBeUndefined();
        expect(req.session.assoLogin).toBeUndefined();
        expect(req.session.connected).toBeFalsy();
    });
});