// @flow
// Importations
import { database } from "../database"
import Association from "../../src/db/Association";

// Tests
describe("Association", function() {
    // Tests
    test("get", async function() {
        const asso = await Association.getByLogin(database, "001");

        expect(asso).not.toBeNull();

        if (asso != null) {
            expect(asso instanceof Association).toBe(true);
            expect(asso.login).toBe("001");
        }
    });

    test("authenticate", async function() {
        const req: any = { session: {}, asso: null };
        const cred = { login: "001", mdp: "cmmdp" };

        // Connexion
        const asso = await Association.authenticate(database, req, cred);

        expect(asso).not.toBeNull();
        if (asso == null) return;

        expect(asso.login).toBe(cred.login);

        expect(req.asso).toEqual(asso);
        expect(req.session.assoLogin).toBe(cred.login);
        expect(req.session.connected).toBe(true);

        // Récup asso connectée
        // - depuis la db
        req.asso = undefined;
        const asso2 = await Association.getLoggedInUser(database, req);

        expect(asso2).toEqual(asso);
        expect(req.asso).toEqual(asso);

        // - depuis la req
        const asso3 = await Association.getLoggedInUser(database, req);
        expect(asso3).toEqual(asso);

        // Déconnexion
        Association.disconnect(req);

        expect(req.asso).toBeUndefined();
        expect(req.session.assoLogin).toBeUndefined();
        expect(req.session.connected).toBeFalsy();
    });

    test("create/update/delete", async function() {
        // Create
        const asso = await Association.create(database, {
            loginAsso: "test@gmail.com",
            mdpAsso: "test",
            nom: "Test",
            presentation: "Blablablablablablablablabla",
            adresse: "Test",
            situation: "Test",
            mail: "test@gmail.com",
            tel: "Test",
            siteWeb: "test.com",
            siret: "01234567890123"
        });

        const asso2 = await Association.getByLogin(database, "test@gmail.com");
        expect(asso2).not.toBeNull();

        // Update
        asso.nom = "Super Test";
        await asso.save();

        const asso3 = await Association.getByLogin(database, "test@gmail.com");
        expect(asso3).not.toBeNull();

        if (asso3 != null) {
            expect(asso3.nom).toBe("Super Test");
        }

        // Delete
        await asso.delete();

        const asso4 = await Association.getByLogin(database, "test@gmail.com");
        expect(asso4).toBeNull();
    });
});