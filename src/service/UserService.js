module.exports = (userRepository, User) => {
  return {
    /**
     * Login a user with the given login provider and user profile.
     *
     * @param  {string} provider Login provider which was used (google, facebook, ...)
     * @param  {Object} profile User profile from that provider.
     * @return {User} Logged in user.
     */
    loginWithProvider: (provider, profile) => {
      return userRepository
        .findByProvider(provider, profile)
        // If not found, this is a new user.
        .then(user => user || User.fromProvider(provider, profile))
        .then(user => user.updateLastLogin())
        .then(user => userRepository.store(user))
    }
  }
};
