// Utilitaires
module.exports = {
    login_guard: function(f, redirect_url="/") {
        return function(req, res, next) {
            if (req.session.connected) {
                f(req, res, next);
            } else {
                res.redirect(redirect_url)
            }
        }
    }
};