/**
 * @typedef {Object} YouTubePlayer
 * @property {Function} loadVideoById - Loads a specified video.
 * @property {Function} cueVideoById - Cues a specified video.
 * @property {Function} loadVideoByUrl - Loads a video by URL.
 * @property {Function} cueVideoByUrl - Cues a video by URL.
 * @property {Function} loadPlaylist - Loads a playlist.
 * @property {Function} cuePlaylist - Cues a playlist.
 * @property {Function} playVideo - Plays the currently loaded video.
 * @property {Function} pauseVideo - Pauses the currently playing video.
 * @property {Function} stopVideo - Stops the currently playing video.
 * @property {Function} seekTo - Seeks to a specified time in the video.
 * @property {Function} nextVideo - Plays the next video in the playlist.
 * @property {Function} previousVideo - Plays the previous video in the playlist.
 * @property {Function} playVideoAt - Plays a specific video in the playlist.
 * @property {Function} mute - Mutes the player.
 * @property {Function} unMute - Unmutes the player.
 * @property {Function} isMuted - Checks if the player is muted.
 * @property {Function} setVolume - Sets the player volume.
 * @property {Function} getVolume - Gets the player volume.
 * @property {Function} setSize - Sets the player size.
 * @property {Function} getPlaybackRate - Gets the playback rate.
 * @property {Function} setPlaybackRate - Sets the playback rate.
 * @property {Function} getAvailablePlaybackRates - Gets available playback rates.
 * @property {Function} setLoop - Sets whether the player should loop playlists.
 * @property {Function} setShuffle - Sets whether playlists should be shuffled.
 * @property {Function} getVideoLoadedFraction - Gets the fraction of the video loaded.
 * @property {Function} getPlayerState - Gets the current player state.
 * @property {Function} getCurrentTime - Gets the current playback time.
 * @property {Function} getDuration - Gets the video duration.
 * @property {Function} getVideoUrl - Gets the URL of the current video.
 * @property {Function} getVideoEmbedCode - Gets the embed code for the current video.
 * @property {Function} getPlaylist - Gets the current playlist.
 * @property {Function} getPlaylistIndex - Gets the index of the current playlist item.
 * @property {Function} addEventListener - Adds an event listener.
 * @property {Function} removeEventListener - Removes an event listener.
 * @property {Function} getIframe - Gets the player iframe element.
 * @property {Function} destroy - Destroys the player instance.
 * @private
 */

/**
 * Creates video player wrapping <a 
 * href="https://developers.google.com/youtube/iframe_api_reference">YouTube IFrame Player API</a>
 *  in a div element with the specified ID.
 * @returns {YouTubePlayer} An object  containing the YouTube API functionality.
 
 * @example 
 * // <div id="player"></div>
  const YT = embedYoutubePlayer();
  new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'dQw4w9WgXcQ',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': null,
      'onTimeChange': onTimeChange,
    }
  });
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  function onTimeChange(time) {
    console.log(time)
  }
*/
export function embedYoutubePlayer() {
  let playerElement = null;
  let videoElement = null;
  let currentVideoId = "";
  let playlist = [];
  let playlistIndex = 0;
  let isLooping = false;
  let isShuffled = false;
  let volume = 100;
  let isMuted = false;
  let playbackRate = 1;
  let playerState = -1;
  let eventListeners = {};

  const PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  };

  function createPlayerElement(elementId, width, height) {
    playerElement = document.getElementById(elementId);
    videoElement = document.createElement("video");
    videoElement.width = width || 640;
    videoElement.height = height || 360;
    videoElement.controls = true;
    playerElement.appendChild(videoElement);
  }

  function triggerEvent(eventName, eventData) {
    if (eventListeners[eventName]) {
      eventListeners[eventName].forEach((listener) =>
        listener({ data: eventData })
      );
    }
  }

  // So we can compare against new updates.
  var lastTimeUpdate = 0;

  function setPlayerState(newState) {
    playerState = newState;
    triggerEvent("onStateChange", playerState);

    var data = JSON.parse(playerState.data);

    // The "infoDelivery" event is used by YT to transmit any
    // kind of information change in the player,
    // such as the current time or a playback quality change.
    if (data.event === "infoDelivery" && data.info && data.info.currentTime) {
      // currentTime is emitted very frequently (milliseconds),
      // but we only care about whole second changes.
      var time = Math.floor(data.info.currentTime);

      if (time !== lastTimeUpdate) {
        lastTimeUpdate = time;

        triggerEvent("onTimeChange", time);
      }
    }
  }
  /**
   * @type {YouTubePlayer}
   */
  var YouTubePlayer = {
    Player: function (elementId, options) {
      createPlayerElement(elementId, options.width, options.height);

      if (options.videoId) {
        this.cueVideoById(options.videoId);
      }

      if (options.events) {
        for (let eventName in options.events) {
          this.addEventListener(eventName, options.events[eventName]);
        }
      }

      // Simulating that the player is ready
      setTimeout(() => triggerEvent("onReady"), 100);

      return {
        loadVideoById: (videoId, startSeconds, suggestedQuality) => {
          currentVideoId = videoId;
          videoElement.src = `https://www.youtube.com/embed/${videoId}`;
          videoElement.currentTime = startSeconds || 0;
          videoElement.play();
          setPlayerState(PlayerState.PLAYING);
        },

        cueVideoById: (videoId, startSeconds, suggestedQuality) => {
          currentVideoId = videoId;
          videoElement.src = `https://www.youtube.com/embed/${videoId}`;
          videoElement.currentTime = startSeconds || 0;
          setPlayerState(PlayerState.CUED);
        },

        loadVideoByUrl: (mediaContentUrl, startSeconds) => {
          videoElement.src = mediaContentUrl;
          videoElement.currentTime = startSeconds || 0;
          videoElement.play();
          setPlayerState(PlayerState.PLAYING);
        },

        cueVideoByUrl: (mediaContentUrl, startSeconds) => {
          videoElement.src = mediaContentUrl;
          videoElement.currentTime = startSeconds || 0;
          setPlayerState(PlayerState.CUED);
        },

        loadPlaylist: (playlistOrVideoIds, index, startSeconds) => {
          playlist = Array.isArray(playlistOrVideoIds)
            ? playlistOrVideoIds
            : [playlistOrVideoIds];
          playlistIndex = index || 0;
          this.loadVideoById(playlist[playlistIndex], startSeconds);
        },

        cuePlaylist: (playlistOrVideoIds, index, startSeconds) => {
          playlist = Array.isArray(playlistOrVideoIds)
            ? playlistOrVideoIds
            : [playlistOrVideoIds];
          playlistIndex = index || 0;
          this.cueVideoById(playlist[playlistIndex], startSeconds);
        },

        playVideo: () => {
          videoElement.play();
          setPlayerState(PlayerState.PLAYING);
        },

        pauseVideo: () => {
          videoElement.pause();
          setPlayerState(PlayerState.PAUSED);
        },

        stopVideo: () => {
          videoElement.pause();
          videoElement.currentTime = 0;
          setPlayerState(PlayerState.ENDED);
        },

        seekTo: (seconds, allowSeekAhead) => {
          videoElement.currentTime = seconds;
        },

        nextVideo: () => {
          if (playlistIndex < playlist.length - 1) {
            playlistIndex++;
          } else if (isLooping) {
            playlistIndex = 0;
          } else {
            return;
          }
          this.loadVideoById(playlist[playlistIndex]);
        },

        previousVideo: () => {
          if (playlistIndex > 0) {
            playlistIndex--;
          } else if (isLooping) {
            playlistIndex = playlist.length - 1;
          } else {
            return;
          }
          this.loadVideoById(playlist[playlistIndex]);
        },

        playVideoAt: (index) => {
          if (index >= 0 && index < playlist.length) {
            playlistIndex = index;
            this.loadVideoById(playlist[playlistIndex]);
          }
        },

        mute: () => {
          videoElement.muted = true;
          isMuted = true;
        },

        unMute: () => {
          videoElement.muted = false;
          isMuted = false;
        },

        isMuted: () => isMuted,

        setVolume: (value) => {
          volume = Math.max(0, Math.min(100, value));
          videoElement.volume = volume / 100;
        },

        getVolume: () => volume,

        setSize: (width, height) => {
          videoElement.width = width;
          videoElement.height = height;
        },

        getPlaybackRate: () => playbackRate,

        setPlaybackRate: (rate) => {
          playbackRate = rate;
          videoElement.playbackRate = rate;
          triggerEvent("onPlaybackRateChange", rate);
        },

        getAvailablePlaybackRates: () => [0.25, 0.5, 1, 1.5, 2],

        setLoop: (loopPlaylists) => {
          isLooping = loopPlaylists;
        },

        setShuffle: (shufflePlaylist) => {
          isShuffled = shufflePlaylist;
          if (isShuffled) {
            // Implement shuffle logic here
          }
        },

        getVideoLoadedFraction: () => {
          if (videoElement.buffered.length === 0) return 0;
          return videoElement.buffered.end(0) / videoElement.duration;
        },

        getPlayerState: () => playerState,

        getCurrentTime: () => videoElement.currentTime,

        getDuration: () => videoElement.duration,

        getVideoUrl: () => `https://www.youtube.com/watch?v=${currentVideoId}`,

        getVideoEmbedCode: () => {
          return `<iframe width="${videoElement.width}" height="${videoElement.height}" src="https://www.youtube.com/embed/${currentVideoId}" frameborder="0" allowfullscreen></iframe>`;
        },

        getPlaylist: () => [...playlist],

        getPlaylistIndex: () => playlistIndex,

        addEventListener: (event, listener) => {
          if (!eventListeners[event]) {
            eventListeners[event] = [];
          }
          eventListeners[event].push(listener);
        },

        removeEventListener: (event, listener) => {
          if (eventListeners[event]) {
            eventListeners[event] = eventListeners[event].filter(
              (l) => l !== listener
            );
          }
        },

        getIframe: () => videoElement,

        destroy: () => {
          videoElement.remove();
          playerElement.innerHTML = "";
          eventListeners = {};
        },
      };
    },

    PlayerState: PlayerState,
  };

  return YouTubePlayer;
}



