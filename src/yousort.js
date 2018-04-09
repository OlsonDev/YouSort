import _ from 'lodash';

class YouSort {
  constructor() {
    this.logPrefix = '[YouSort]';
    this.playlistKeyPrefix = 'playlist-';
    this.storage = {};
    this.log('Loaded.');
  }

  log(...args) {
    console.log(this.logPrefix, ...args);
  }

  run() {
    this.log('run() not implemented');
  }

  setStorage(data) {
    return new Promise((resolve, _reject) => {
      this.log('Storage data', data);
      chrome.storage.local.set(data, () => {
        this.log('Stored data locally.');
        this.updateStorage(true).then(resolve);
      });
    });
  }

  updateStorage(silent) {
    return new Promise((resolve, _reject) => {
      chrome.storage.local.get(data => {
        this.storage = _.assign({}, this.storage, data);
        if (!silent) this.log('Storage updated', this.storage);
        resolve();
      });
    });
  }

  updatePlaylist(playlist) {
    const currentPlaylist = this.playlistKeyPrefix + playlist.id;
    const data = { [currentPlaylist]: playlist, currentPlaylist };
    this.setStorage(data);
  }

  getAllPlaylists() {
    return new Promise((resolve, _reject) =>
      this.updateStorage(true).then(() => {
        const allPlaylists = _.toArray(_.pickBy(this.storage, (v, k) => k.startsWith(this.playlistKeyPrefix)));
        resolve(allPlaylists);
      }));
  }

  mergeAuthors(silent) {
    return new Promise((resolve, _reject) => {
      this.getAllPlaylists().then(playlists => {
        this.log('Playlists', playlists);
        const playlistAuthors = _.map(playlists, YouSort.getPlaylistAuthors);
        const allAuthors = _.flatten(playlistAuthors);
        const authors = _.sortBy(_.uniqBy(allAuthors, 'authorUrl'), 'authorName');
        if (!silent) this.log('Authors merged', authors);
        this.setStorage({ authors }).then(resolve);
      });
    });
  }

  static getPlaylistAuthors(playlist) {
    return _.map(_.uniqBy(playlist.videos, 'authorUrl'), _.partialRight(_.pick, ['authorUrl', 'authorName']));
  }
}

export default YouSort;