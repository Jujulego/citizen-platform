// @flow
// Importations
import type { $Request, $Response, Middleware, NextFunction } from "express";

// Utilitaires
export default {
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