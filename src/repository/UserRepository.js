module.exports = (leveldb) => {
  return {
    findByProvider: (provider, profile) => {
      if (!provider) {
        return Promise.reject('No provider id given.');
      }
      if (!profile || profile.id) {
        return Promise.reject('No profile id given.');
      }

      return leveldb.get(`${provider}-${profile.id}`);
    },

    store: (user) => {
      return leveldb.put(`${user.provider}-${user.provider.profileId}`, user);
    }
  }
};
