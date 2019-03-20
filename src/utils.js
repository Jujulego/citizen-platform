// @flow
// Importations
import type { $Request, $Response, Middleware, NextFunction } from "express";

// Constantes
const ALPHABET = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789";

// Utilitaires
export default {
    random_int: function(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max - min))
    },

    random_text: function(length: number): string {
        let txt = "";

        for (let i = 0; i < length; ++i) {
            txt += ALPHABET[this.random_int(0, ALPHABET.length)];
        }

        return txt;
    },

    // Guards
    login_guard: function(f: Middleware, redirect_url: string="/") {
        return function(req: $Request, res: $Response, next: NextFunction) {
            if (req.session.connected) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        }
    },

    user_guard: function(f: Middleware, redirect_url: string="/") {
        return this.login_guard(function(req: $Request, res: $Response, next: NextFunction) {
            if (req.session.userLogin !== undefined) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        })
    },

    asso_guard: function(f: Middleware, redirect_url: string="/") {
        return this.login_guard(function(req: $Request, res: $Response, next: NextFunction) {
            if (req.session.assoLogin !== undefined) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        })
    }
};