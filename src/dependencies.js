// Static dependencies, changing these requires a restart
// in hot reloading mode.
const level = require('level');
const leveldb = require('level-promisify')(level);
const express = require('express');

const app = express();

const deps = {
  // Dynamic dependencies which will be hot reloaded.
  // Use ES6 getters to require when needed.

  app,

  get routes() {
    const router = express.Router();
    deps.userController.routes(router);
    return router;
  },

  get User() {
    return require('./model/User')()
  },
  get userRepository() {
    return require('./repository/UserRepository')(leveldb)
  },
  get userService() {
    return require('./service/UserService')(deps.userRepository, deps.User);
  },
  get userController() {
    return require('./controller/UserController')(deps.userService);
  }
};

module.exports = deps;
