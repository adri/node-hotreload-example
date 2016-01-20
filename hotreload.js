const chokidar = require('chokidar');
const dependencies = require('./src/dependencies');
const app = dependencies.app;

// Include server routes as a middleware
app.use((req, res, next) => {
  dependencies.routes(req, res, next)
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch(['./src']);
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Clearing module cache from server');
    Object.keys(require.cache).forEach((file) => {
      if (/src/.test(file) && file.indexOf('node_modules') === -1) {
        delete require.cache[file];
      }
    });
  });
});


module.exports = app;
