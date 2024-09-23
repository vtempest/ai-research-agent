import { convertHTMLSpecialChars } from "../../../index";
import { scrapeURL } from "./scrape-url.js"
/**
 * Fetch youtube.com video's webpage HTML for embedded transcript
 * if blocked, use scraper of alternative sites
 * @param {string} videoUrl
 * @param {Object} [options]
  * @param {boolean} options.addTimestamps default=true - true to return timestamps, default true
 * @param {boolean} options.timeout default=5 - http request timeout
 * @return {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @category Extract
 * @author [Gulakov, A. (2024)](https://airesearch.js.org)
 */
export async function convertYoutubeToText(videoUrl, options = {}) {
  const { addTimestamps = true, timeout = 5 } = options;

  const videoId = getURLYoutubeVideo(videoUrl);

  // var res = await fetchTranscriptOfficialYoutube(videoId, options);

  // if (!res || res.error)
    var res = await fetchViaYoutubeToTranscriptCom(videoId, options);


  if (!res || res.error)
    var res = await fetchTranscriptTactiq(videoId, options);

  

  // console.log(res)
  if (!res || !res.content) return { error: 1 };
  var { content, timestamps } = res;

  // if (!addTimestamps) return { content };


  var word_count = content.split(" ").length;


  
  content = convertHTMLSpecialChars(content);

  var speedsEveryCharPeriod = {};
  const valueCharPeriod = 100;

  for (var timestamp of timestamps){

    var [char, time] = timestamp;

    var speed = Math.floor(char/time)-10;
    speedsEveryCharPeriod[Math.floor(char/valueCharPeriod)] = speed;

  }

  var speeds = Object.keys(speedsEveryCharPeriod)
    .map(timeKey=>speedsEveryCharPeriod[timeKey])

    
  let compressed = [];
  let compressedCount = [];
  let currentNum = speeds[0];
  let count = 1;

  for (let i = 1; i < speeds.length; i++) {
      if (speeds[i] === currentNum) {
          count++;
      } else {
        compressed.push(currentNum)
        compressedCount.push(count)
        currentNum = speeds[i];
          count = 1;
      }
  }
  compressed.push(currentNum)
  compressedCount.push(count)

  var total = 0;
  compressedCount = compressedCount.map(c=>{
    total += c;
    return total;
  })

  speeds = compressed.join(',') + "   " + compressedCount.join(',');


  //TODO replace
    content =
      '<iframe width="560" height="315" data-timestamps="'+
      speeds +
       '" src="https://www.youtube.com/embed/' +
      videoId +
      '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
      content;

  return { content, timestamps:speeds, word_count};
}




function decompressTimestampsArray(compressedStr) {
  let decompressed = [];
  let parts = compressedStr.split(',');

  for (let part of parts) {
      let [num, count] = part.split('x');
      num = parseInt(num);
      count = parseInt(count);
      decompressed.push(...Array(count).fill(num));
  }

  return decompressed;
}


/**
 * Test if URL is to youtube video and return video id if true
 * @param {string} url - youtube video URL
 * @returns {string|boolean} video ID or false
 * @private
 */
export function getURLYoutubeVideo(url) {
  var match = url?.match(
    /(?:\/embed\/|v=|v\/|vi\/|youtu\.be\/|\/v\/|^https?:\/\/(?:www\.)?youtube\.com\/(?:(?:watch)?\?.*v=|(?:embed|v|vi|user)\/))([^#\&\?]*).*/
  );
  return match ? match[1] : false;
}

/**
 * Get YouTube transcript of most YouTube videos,
 * except if disabled by uploader
 * fetch-based scraper of youtubetotranscript.com
 *
 * @param {string} videoUrl
 * @returns {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @private
 */
export async function fetchViaYoutubeToTranscriptCom(videoId, options = {}) {
  try {
    const url = `https://youtubetotranscript.com/transcript?v=${videoId}&current_language_code=en`;

    const html = await (await fetch(url, options)).text()

    if (!html )
      return {error:1}

    const transcriptRegex =
      /<span data-start="([\d.]+)"[^>]*>((?:(?!<\/span>).|\n)*?)<\/span>/gs;
    const matches = Array.from(html.matchAll(transcriptRegex));

    const transcript = matches.map((match) => ({
      text: match[2].replace(/<br\s*\/?>/gi, " ").trim(),
      offset: parseFloat(match[1]),
    }));



    const content = transcript.map((item) => item.text).join(" ");
    let timestamps = [];
    let charIndex = 0;

    transcript.forEach((item) => {
      timestamps.push([charIndex, Math.floor( item.offset)]);
      charIndex += item.text.length + 1; // +1 for the space we added
    });


    return { content, timestamps};
  } catch (e) {
    
    return {error:1}
  }
}

/**
 * Fetches via tactiq api
 * @param {string} videoId 
 * @returns 
 */
async function fetchTranscriptTactiq(videoId, options = {}) {
  const url = "https://tactiq-apps-prod.tactiq.io/transcript";
  const headers = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Linux"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  };
  const payload = {
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    langCode: "en"
  };

  try {
    const data = await scrapeURL(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!data.captions || data.captions.length === 0) {
      return { error: true };
    }

    let content = "";
    let timestamps = [];
    let currentLength = 0;

    data.captions.forEach(({ start, dur, text }) => {
      timestamps.push([currentLength, Math.floor(parseFloat(start))]);
      content += text + " ";
      currentLength = content.length;
    });

    return { content, timestamps };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return { error: true };
  }
}


            /** ========== NOT WORKING ========== */


            
/**
 * Get YouTube transcript of most YouTube videos,
 * except if disabled by uploader
 * fetch-based scraper of youtubetranscript.com
 *
 * @param {string} videoUrl
 * @returns {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @private
 */
export async function fetchViaYoutubeTranscript(videoId, options = {}) {
  const { timeout = 5 } = options;
  const url = "https://youtubetranscript.com/?server_vid2=" + videoId;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeout * 1000),
  });
  const html = await response.text();

  const transcriptRegex = /<text data-start="([\d.]+)".*?>(.*?)<\/text>/g;
  const matches = Array.from(html.matchAll(transcriptRegex));

  const transcript = matches.map((match) => ({
    text: match[2],
    offset: parseFloat(match[1]),
  }));

  const content = transcript.map((item) => item.text).join(" ");
  let timestamps = [];
  let charIndex = 0;

  transcript.forEach((item) => {
    timestamps.push([charIndex, Math.floor(item.offset)]);
    charIndex += item.text.length + 1; // +1 for the space we added
  });

  return { content, timestamps };
}

async function fetchTranscriptOfficialYoutube(videoId, options = {}) {
  const videoPageBody = await scrapeURL(
    `https://www.youtube.com/watch?v=${videoId}`
  )


  //youtube bot limiting
  if (videoPageBody?.error  ||
    videoPageBody.includes('class="g-recaptcha"') ||
    !videoPageBody.includes('"playabilityStatus":') 
  )
    return { error: true };



  var videoObj = videoPageBody.replace("\n", "")
  .split('"captions":')?.[1]
  ?.split(',"videoDetails')[0]
  

  if (!videoObj) return {error:1}

  const captions = JSON.parse(videoObj)?.playerCaptionsTracklistRenderer;

  if (!captions?.captionTracks)
    return { error: true };

  const track = captions.captionTracks.find(
    (track) => track.languageCode === "en"
  );

  if (!track) return { error: true };

  const transcriptBody = await scrapeURL(track.baseUrl);

  if (transcriptBody.error) return { error: true };

  const results = [
    ...transcriptBody.matchAll(
      /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g
    ),
  ];

  var transcript = results.map(([, start, duration, text]) => ({
    text,
    duration: parseFloat(duration),
    offset: parseFloat(start),
    lang: track.languageCode,
  }));

  var content = "";
  var timestamps = [];
  transcript.forEach(({ offset, text }) => {
    timestamps.push([content.length, Math.floor(offset, 0)]);

    content += text + " ";
  });

  return { content, timestamps };
}
