// Utilitaires
export default {
    login_guard: function(f, redirect_url="/") {
        return function(req, res, next) {
            if (req.session.connected) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        }
    },

    user_guard: function(f, redirect_url="/") {
        return this.login_guard(function(req, res, next) {
            if (req.session.userLogin !== undefined) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        })
    },

    asso_guard: function(f, redirect_url="/") {
        return this.login_guard(function(req, res, next) {
            if (req.session.assoLogin !== undefined) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        })
    }
};