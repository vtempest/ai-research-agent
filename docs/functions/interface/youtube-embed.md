[ai-research-agent](../modules.md) / interface/youtube-embed

## Interface

### embedYoutubePlayer()

```ts
function embedYoutubePlayer(): YouTubePlayer
```

Creates video player wrapping <a 
href="https://developers.google.com/youtube/iframe_api_reference">YouTube IFrame Player API</a>
 in a div element with the specified ID.

#### Returns

[`YouTubePlayer`](youtube-embed.md#youtubeplayer)

An object  containing the YouTube API functionality.

#### Example

```ts
// <div id="player"></div>
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
```

## Other

### YouTubePlayer

#### Properties

##### addEventListener

```ts
addEventListener: Function;
```

Adds an event listener.

##### cuePlaylist

```ts
cuePlaylist: Function;
```

Cues a playlist.

##### cueVideoById

```ts
cueVideoById: Function;
```

Cues a specified video.

##### cueVideoByUrl

```ts
cueVideoByUrl: Function;
```

Cues a video by URL.

##### destroy

```ts
destroy: Function;
```

Destroys the player instance.

##### getAvailablePlaybackRates

```ts
getAvailablePlaybackRates: Function;
```

Gets available playback rates.

##### getCurrentTime

```ts
getCurrentTime: Function;
```

Gets the current playback time.

##### getDuration

```ts
getDuration: Function;
```

Gets the video duration.

##### getIframe

```ts
getIframe: Function;
```

Gets the player iframe element.

##### getPlaybackRate

```ts
getPlaybackRate: Function;
```

Gets the playback rate.

##### getPlayerState

```ts
getPlayerState: Function;
```

Gets the current player state.

##### getPlaylist

```ts
getPlaylist: Function;
```

Gets the current playlist.

##### getPlaylistIndex

```ts
getPlaylistIndex: Function;
```

Gets the index of the current playlist item.

##### getVideoEmbedCode

```ts
getVideoEmbedCode: Function;
```

Gets the embed code for the current video.

##### getVideoLoadedFraction

```ts
getVideoLoadedFraction: Function;
```

Gets the fraction of the video loaded.

##### getVideoUrl

```ts
getVideoUrl: Function;
```

Gets the URL of the current video.

##### getVolume

```ts
getVolume: Function;
```

Gets the player volume.

##### isMuted

```ts
isMuted: Function;
```

Checks if the player is muted.

##### loadPlaylist

```ts
loadPlaylist: Function;
```

Loads a playlist.

##### loadVideoById

```ts
loadVideoById: Function;
```

Loads a specified video.

##### loadVideoByUrl

```ts
loadVideoByUrl: Function;
```

Loads a video by URL.

##### mute

```ts
mute: Function;
```

Mutes the player.

##### nextVideo

```ts
nextVideo: Function;
```

Plays the next video in the playlist.

##### pauseVideo

```ts
pauseVideo: Function;
```

Pauses the currently playing video.

##### playVideo

```ts
playVideo: Function;
```

Plays the currently loaded video.

##### playVideoAt

```ts
playVideoAt: Function;
```

Plays a specific video in the playlist.

##### previousVideo

```ts
previousVideo: Function;
```

Plays the previous video in the playlist.

##### removeEventListener

```ts
removeEventListener: Function;
```

Removes an event listener.

##### seekTo

```ts
seekTo: Function;
```

Seeks to a specified time in the video.

##### setLoop

```ts
setLoop: Function;
```

Sets whether the player should loop playlists.

##### setPlaybackRate

```ts
setPlaybackRate: Function;
```

Sets the playback rate.

##### setShuffle

```ts
setShuffle: Function;
```

Sets whether playlists should be shuffled.

##### setSize

```ts
setSize: Function;
```

Sets the player size.

##### setVolume

```ts
setVolume: Function;
```

Sets the player volume.

##### stopVideo

```ts
stopVideo: Function;
```

Stops the currently playing video.

##### unMute

```ts
unMute: Function;
```

Unmutes the player.
