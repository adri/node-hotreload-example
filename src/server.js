const dependencies = require('./dependencies');
const app = dependencies.app;
const routes = dependencies.routes;

app.use(routes);

module.exports = app;

