import { webm, mp4 } from './media.js';

export default class noSleep {
  constructor() {
    this.enabled = false;

    // Set up no sleep video element
    this.noSleepVideo = document.createElement('video');

    this.noSleepVideo.setAttribute('title', 'No Sleep');
    this.noSleepVideo.setAttribute('playsinline', '');

    this._addSourceToVideo(this.noSleepVideo, 'webm', webm);
    this._addSourceToVideo(this.noSleepVideo, 'mp4', mp4);

    this.noSleepVideo.addEventListener('loadedmetadata', () => {
      if (this.noSleepVideo.duration <= 1) {
        // webm source
        this.noSleepVideo.setAttribute('loop', '');
      } else {
        // mp4 source
        this.noSleepVideo.addEventListener('timeupdate', () => {
          if (this.noSleepVideo.currentTime > 0.5) {
            this.noSleepVideo.currentTime = Math.random();
          }
        });
      }
    });
  }

  _addSourceToVideo(element, type, dataURI) {
    var source = document.createElement('source');
    source.src = dataURI;
    source.type = `video/${type}`;
    element.appendChild(source);
  }

  get isEnabled() {
    return this.enabled;
  }

  enable() {
    let playPromise = this.noSleepVideo.play();
    return playPromise
      .then((res) => {
        this.enabled = true;
        return res;
      })
      .catch((err) => {
        this.enabled = false;
        throw err;
      });
  }

  disable() {
    this.noSleepVideo.pause();
    this.enabled = false;
  }
}
