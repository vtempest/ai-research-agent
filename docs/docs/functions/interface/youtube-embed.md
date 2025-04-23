[Documentation](../modules.md) / interface/youtube-embed

## Interface

### embedYoutubePlayer()

```ts
function embedYoutubePlayer(): YouTubePlayer;
```

Defined in: interface/youtube-embed.js:68

Creates video player wrapping <a 
href="https://developers.google.com/youtube/iframe_api_reference">YouTube IFrame Player API</a>
 in a div element with the specified ID.

#### Returns

[`YouTubePlayer`](#youtubeplayer)

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

Defined in: interface/youtube-embed.js:2

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="addeventlistener"></a> `addEventListener`

</td>
<td>

`Function`

</td>
<td>

Adds an event listener.

</td>
<td>

interface/youtube-embed.js:35

</td>
</tr>
<tr>
<td>

<a id="cueplaylist"></a> `cuePlaylist`

</td>
<td>

`Function`

</td>
<td>

Cues a playlist.

</td>
<td>

interface/youtube-embed.js:8

</td>
</tr>
<tr>
<td>

<a id="cuevideobyid"></a> `cueVideoById`

</td>
<td>

`Function`

</td>
<td>

Cues a specified video.

</td>
<td>

interface/youtube-embed.js:4

</td>
</tr>
<tr>
<td>

<a id="cuevideobyurl"></a> `cueVideoByUrl`

</td>
<td>

`Function`

</td>
<td>

Cues a video by URL.

</td>
<td>

interface/youtube-embed.js:6

</td>
</tr>
<tr>
<td>

<a id="destroy"></a> `destroy`

</td>
<td>

`Function`

</td>
<td>

Destroys the player instance.

</td>
<td>

interface/youtube-embed.js:38

</td>
</tr>
<tr>
<td>

<a id="getavailableplaybackrates"></a> `getAvailablePlaybackRates`

</td>
<td>

`Function`

</td>
<td>

Gets available playback rates.

</td>
<td>

interface/youtube-embed.js:24

</td>
</tr>
<tr>
<td>

<a id="getcurrenttime"></a> `getCurrentTime`

</td>
<td>

`Function`

</td>
<td>

Gets the current playback time.

</td>
<td>

interface/youtube-embed.js:29

</td>
</tr>
<tr>
<td>

<a id="getduration"></a> `getDuration`

</td>
<td>

`Function`

</td>
<td>

Gets the video duration.

</td>
<td>

interface/youtube-embed.js:30

</td>
</tr>
<tr>
<td>

<a id="getiframe"></a> `getIframe`

</td>
<td>

`Function`

</td>
<td>

Gets the player iframe element.

</td>
<td>

interface/youtube-embed.js:37

</td>
</tr>
<tr>
<td>

<a id="getplaybackrate"></a> `getPlaybackRate`

</td>
<td>

`Function`

</td>
<td>

Gets the playback rate.

</td>
<td>

interface/youtube-embed.js:22

</td>
</tr>
<tr>
<td>

<a id="getplayerstate"></a> `getPlayerState`

</td>
<td>

`Function`

</td>
<td>

Gets the current player state.

</td>
<td>

interface/youtube-embed.js:28

</td>
</tr>
<tr>
<td>

<a id="getplaylist"></a> `getPlaylist`

</td>
<td>

`Function`

</td>
<td>

Gets the current playlist.

</td>
<td>

interface/youtube-embed.js:33

</td>
</tr>
<tr>
<td>

<a id="getplaylistindex"></a> `getPlaylistIndex`

</td>
<td>

`Function`

</td>
<td>

Gets the index of the current playlist item.

</td>
<td>

interface/youtube-embed.js:34

</td>
</tr>
<tr>
<td>

<a id="getvideoembedcode"></a> `getVideoEmbedCode`

</td>
<td>

`Function`

</td>
<td>

Gets the embed code for the current video.

</td>
<td>

interface/youtube-embed.js:32

</td>
</tr>
<tr>
<td>

<a id="getvideoloadedfraction"></a> `getVideoLoadedFraction`

</td>
<td>

`Function`

</td>
<td>

Gets the fraction of the video loaded.

</td>
<td>

interface/youtube-embed.js:27

</td>
</tr>
<tr>
<td>

<a id="getvideourl"></a> `getVideoUrl`

</td>
<td>

`Function`

</td>
<td>

Gets the URL of the current video.

</td>
<td>

interface/youtube-embed.js:31

</td>
</tr>
<tr>
<td>

<a id="getvolume"></a> `getVolume`

</td>
<td>

`Function`

</td>
<td>

Gets the player volume.

</td>
<td>

interface/youtube-embed.js:20

</td>
</tr>
<tr>
<td>

<a id="ismuted"></a> `isMuted`

</td>
<td>

`Function`

</td>
<td>

Checks if the player is muted.

</td>
<td>

interface/youtube-embed.js:18

</td>
</tr>
<tr>
<td>

<a id="loadplaylist"></a> `loadPlaylist`

</td>
<td>

`Function`

</td>
<td>

Loads a playlist.

</td>
<td>

interface/youtube-embed.js:7

</td>
</tr>
<tr>
<td>

<a id="loadvideobyid"></a> `loadVideoById`

</td>
<td>

`Function`

</td>
<td>

Loads a specified video.

</td>
<td>

interface/youtube-embed.js:3

</td>
</tr>
<tr>
<td>

<a id="loadvideobyurl"></a> `loadVideoByUrl`

</td>
<td>

`Function`

</td>
<td>

Loads a video by URL.

</td>
<td>

interface/youtube-embed.js:5

</td>
</tr>
<tr>
<td>

<a id="mute"></a> `mute`

</td>
<td>

`Function`

</td>
<td>

Mutes the player.

</td>
<td>

interface/youtube-embed.js:16

</td>
</tr>
<tr>
<td>

<a id="nextvideo"></a> `nextVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the next video in the playlist.

</td>
<td>

interface/youtube-embed.js:13

</td>
</tr>
<tr>
<td>

<a id="pausevideo"></a> `pauseVideo`

</td>
<td>

`Function`

</td>
<td>

Pauses the currently playing video.

</td>
<td>

interface/youtube-embed.js:10

</td>
</tr>
<tr>
<td>

<a id="playvideo"></a> `playVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the currently loaded video.

</td>
<td>

interface/youtube-embed.js:9

</td>
</tr>
<tr>
<td>

<a id="playvideoat"></a> `playVideoAt`

</td>
<td>

`Function`

</td>
<td>

Plays a specific video in the playlist.

</td>
<td>

interface/youtube-embed.js:15

</td>
</tr>
<tr>
<td>

<a id="previousvideo"></a> `previousVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the previous video in the playlist.

</td>
<td>

interface/youtube-embed.js:14

</td>
</tr>
<tr>
<td>

<a id="removeeventlistener"></a> `removeEventListener`

</td>
<td>

`Function`

</td>
<td>

Removes an event listener.

</td>
<td>

interface/youtube-embed.js:36

</td>
</tr>
<tr>
<td>

<a id="seekto"></a> `seekTo`

</td>
<td>

`Function`

</td>
<td>

Seeks to a specified time in the video.

</td>
<td>

interface/youtube-embed.js:12

</td>
</tr>
<tr>
<td>

<a id="setloop"></a> `setLoop`

</td>
<td>

`Function`

</td>
<td>

Sets whether the player should loop playlists.

</td>
<td>

interface/youtube-embed.js:25

</td>
</tr>
<tr>
<td>

<a id="setplaybackrate"></a> `setPlaybackRate`

</td>
<td>

`Function`

</td>
<td>

Sets the playback rate.

</td>
<td>

interface/youtube-embed.js:23

</td>
</tr>
<tr>
<td>

<a id="setshuffle"></a> `setShuffle`

</td>
<td>

`Function`

</td>
<td>

Sets whether playlists should be shuffled.

</td>
<td>

interface/youtube-embed.js:26

</td>
</tr>
<tr>
<td>

<a id="setsize"></a> `setSize`

</td>
<td>

`Function`

</td>
<td>

Sets the player size.

</td>
<td>

interface/youtube-embed.js:21

</td>
</tr>
<tr>
<td>

<a id="setvolume"></a> `setVolume`

</td>
<td>

`Function`

</td>
<td>

Sets the player volume.

</td>
<td>

interface/youtube-embed.js:19

</td>
</tr>
<tr>
<td>

<a id="stopvideo"></a> `stopVideo`

</td>
<td>

`Function`

</td>
<td>

Stops the currently playing video.

</td>
<td>

interface/youtube-embed.js:11

</td>
</tr>
<tr>
<td>

<a id="unmute"></a> `unMute`

</td>
<td>

`Function`

</td>
<td>

Unmutes the player.

</td>
<td>

interface/youtube-embed.js:17

</td>
</tr>
</tbody>
</table>
