import YouSort from '../yousort';

class YouSortContent extends YouSort {
  run() {
    this
      .loadAllVideos()
      .then(() => this.logPlaylist());
  }

  loadMoreVideos() {
    const btn = document.querySelector('#pl-video-table ~ .load-more-button');
    if (!btn) {
      this.log('Nothing to load.');
      return false;
    }
    if (btn.disabled) {
      this.log('Loading in progress...');
      return true;
    }
    this.log('Loading more videos!');
    btn.click();
    return true;
  }

  loadAllVideos() {
    return new Promise((resolve, _reject) => {
      const interval = setInterval(() => {
        const tryMore = this.loadMoreVideos();
        if (!tryMore) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }

  logPlaylist() {
    const playlist = {
      id: YouSortContent.getPlaylistId(),
      name: YouSortContent.getPlaylistName(),
      videos: this.getPlaylistVideos(),
    };
    this.updatePlaylist(playlist);
  }

  getPlaylistVideos() {
    return [...document.querySelectorAll('#pl-video-list .pl-video')]
      .map((elem, i) => {
        const videoName = this.getText(elem, '.pl-video-title-link');
        const isDeleted = videoName === '[Deleted video]';
        const shouldLogFailure = !isDeleted;
        const video = {
          index: 1 + i,
          videoName,
          isDeleted,
          authorName: this.getText(elem, '.pl-video-owner a', shouldLogFailure),
          authorUrl: this.getHref(elem, '.pl-video-owner a', shouldLogFailure),
          videoTime: this.getText(elem, '.pl-video-time .timestamp', shouldLogFailure),
        };
        return video;
      });
  }

  getText(parent, selector, shouldLogFailure) {
    const elem = parent.querySelector(selector);
    if (!elem) {
      if (shouldLogFailure) this.log(`${selector} not found in parent`, parent);
      return null;
    }
    return elem.innerText;
  }

  getHref(parent, selector, shouldLogFailure) {
    const elem = parent.querySelector(selector);
    if (!elem) {
      if (shouldLogFailure) this.log(`${selector} not found in parent`, parent);
      return null;
    }
    return elem.href;
  }

  static getPlaylistId() {
    const header = document.querySelector('#pl-header');
    return header.dataset.fullListId;
  }

  static getPlaylistName() {
    const header = document.querySelector('#pl-header');
    const title = header.querySelector('.pl-header-title');
    return title.innerText;
  }
}

(new YouSortContent()).run();