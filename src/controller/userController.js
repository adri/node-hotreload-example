module.exports = (userService) => {
    function login(req, res, next) {
        return userService
            .loginWithProvider(req.query.provider, req.query.profile)
            .then(user => res.json(user))
            .catch(next);
    }

    return {
        routes: (app) => {
            app.get('/login', login);
        }
    }
};
