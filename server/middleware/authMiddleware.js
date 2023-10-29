function checkAuthentication(predicate) {
    return (req, res, next) => {
        if (predicate(req)) {
            next();
        } else if(req.isAuthenticated()) {
            res.status(403).json({ message: 'Unauthorized' })
        } else {
            res.status(401).json({ message: 'Unauthenticated' });
        }
    }
}

function requireAuthentication() {
    return checkAuthentication(req => req.isAuthenticated());
}

function requireAdmin() {
    return checkAuthentication(req => req.isAuthenticated() && req.session.passport.user.isAdmin);
}

module.exports = {
    requireAuthentication,
    requireAdmin
};
