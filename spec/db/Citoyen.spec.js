// @flow
// Importations
import Citoyen from "../../src/db/Citoyen";
import { database } from "../database";

// Tests
describe("Citoyen", function() {
    // Tests
    test("get", async function() {
        const cit = await Citoyen.getByLogin(database, "charleslegrand@carolingiens.fr");

        expect(cit).not.toBeNull();

        if (cit != null) {
            expect(cit instanceof Citoyen).toBe(true);
            expect(cit.nom).toBe("Carolingiens");
        }
    });

    test("authenticate", async function() {
        const req: any = { session: {}, user: null };
        const cred = { login: "charleslegrand@carolingiens.fr", mdp: "jaiInventeLEcole" };

        // Connexion
        const cit = await Citoyen.authenticate(database, req, cred);

        expect(cit).not.toBeNull();
        if (cit == null) return;

        expect(cit.login).toBe(cred.login);
        expect(req.session.userLogin).toBe(cred.login);
        expect(req.session.connected).toBe(true);
        expect(req.user).toEqual(cit);

        // Récup citoyen connectée
        // - depuis la db
        req.user = undefined;
        const cit2 = await Citoyen.getLoggedInUser(database, req);

        expect(cit2).toEqual(cit);
        expect(req.user).toEqual(cit);

        // - depuis la req
        const cit3 = await Citoyen.getLoggedInUser(database, req);
        expect(cit3).toEqual(cit);

        // Déconnexion
        Citoyen.disconnect(req);

        expect(req.user).toBeUndefined();
        expect(req.session.userLogin).toBeUndefined();
        expect(req.session.connected).toBeFalsy();
    });
});