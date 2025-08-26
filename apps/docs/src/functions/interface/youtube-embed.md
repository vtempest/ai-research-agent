[Documentation](../modules.md) / interface/youtube-embed

## Interface

### embedYoutubePlayer()

```ts
function embedYoutubePlayer(): YouTubePlayer;
```

Defined in: [packages/ai-research-agent/src/interface/youtube-embed.js:68](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L68)

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

Defined in: [packages/ai-research-agent/src/interface/youtube-embed.js:2](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L2)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:35](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L35)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L8)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:4](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L4)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L6)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:38](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L38)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:24](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L24)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:29](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L29)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L30)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:37](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L37)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L22)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:28](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L28)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:33](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L33)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:34](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L34)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:32](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L32)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:27](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L27)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:31](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L31)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L20)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L18)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L7)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L3)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L5)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L16)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L13)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L10)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L9)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L15)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L14)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:36](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L36)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L12)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:25](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L25)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L23)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:26](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L26)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L21)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L19)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L11)

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

[packages/ai-research-agent/src/interface/youtube-embed.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L17)

</td>
</tr>
</tbody>
</table>
