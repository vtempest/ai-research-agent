import { convertHTMLToEscapedHTML } from "../html-to-content/html-utils.js";
import { scrapeURL } from "./scrape-url.js";

/**
 * Fetch youtube.com video's webpage HTML for embedded transcript.
 * If blocked, use scraper of alternative sites providing transcripts.
 * @param {string} videoUrl
 * @param {Object} [options]
 * @param {boolean} options.addTimestamps default=true -
 * true to return timestamps, default true
 * @param {boolean} options.timeout default=5 - http request timeout
 * @return {{content: string, timestamps: string, word_count: number}}
 * where content is the full text of the transcript,
 * timestamps is a string of comma-separated [characterIndex, timeSeconds] pairs,
 * and word_count is the number of words in the transcript.
 * @category Extract
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 */
export async function convertYoutubeToText(videoUrl, options = {}) {
  const { 
    useThirdPartyBackup = true,
    addTimestamps = true, 
    addPlayer = true,
    timeout = 10,
    proxy = null
  } = options;

  const videoId = getURLYoutubeVideo(videoUrl);

  var res = {}, date;

  // alert(useThirdPartyBackup)
  if (!useThirdPartyBackup) {
    var res = await fetchTranscriptOfficialYoutube(videoId, options);
    // alert(res)

  } else {
      var res = await fetchTranscriptOfficialYoutube(videoId, options);

    //ip blocked on cf -- add proxy?
    var res = await fetchTranscriptOfficialYoutube(videoId, options);

    // // console.log(res);
    // if (!res.content || res.error)
    //   res = await fetchViaYoutubeTranscript(videoId, options);

    // if (!res.content || res.error)
      res = await fetchTranscriptTactiq(videoId, options);
    
    if (!res.content || res.error)
      res = await fetchViaYoutubeToTranscriptCom(videoId, options);

    
  }
  
  date = await extractYouTubeDate(videoId, options);
  // console.log(date);

  if (!res.content || res.error) return { error: 1 };
  var { content, timestamps } = res;

  var word_count = content.split(" ").length;

  content = convertHTMLToEscapedHTML(content);


  //timestamp to track characters per second speed at each interval

  var speedsEveryCharPeriod = {};
  const valueCharPeriod = 100;

  for (var timestamp of timestamps) {
    var [char, time] = timestamp;

    var speed = Math.floor(char / time) - 10;
    speedsEveryCharPeriod[Math.floor(char / valueCharPeriod)] = speed;
  }

  var speeds = Object.keys(speedsEveryCharPeriod).map(
    (timeKey) => speedsEveryCharPeriod[timeKey]
  );

  let compressed = [];
  let compressedCount = [];
  let currentNum = speeds[0];
  let count = 1;

  for (let i = 1; i < speeds.length; i++) {
    if (speeds[i] === currentNum) {
      count++;
    } else {
      compressed.push(currentNum);
      compressedCount.push(count);
      currentNum = speeds[i];
      count = 1;
    }
  }
  compressed.push(currentNum);
  compressedCount.push(count);

  var total = 0;
  compressedCount = compressedCount.map((c) => {
    total += c;
    return total;
  });

  speeds = compressed.join(",") + "   " + compressedCount.join(",");

  if (addPlayer)
    content = `<iframe width="100%" height="315px" data-timestamps="${speeds}" 
    src="https://www.youtube.com/embed/${videoId}" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture" allowfullscreen></iframe>${content}`;

  
  var source = "YouTube";
  
  return { html: content, word_count, source,  date, ...res };
}

function decompressTimestampsArray(compressedStr) {
  let decompressed = [];
  let parts = compressedStr.split(",");

  for (let part of parts) {
    let [num, count] = part.split("x");
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
 * Fetch-based scraper of youtubetotranscript.com
 * @param {string} videoUrl
 * @returns {Object} content, timestamps -  where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 */
export async function fetchViaYoutubeToTranscriptCom(videoId, options = {}) {
  // try {
    const url = `https://youtubetotranscript.com/transcript?v=${videoId}&current_language_code=en`;

    var html = await scrapeURL(url, options);
    
    if (!html) return { error: 1 };

    //remove line breaks
    html = html?.replace(/[\r\n]/gi, " ");
    // Title regex
    const titleRegex = /<h1[^>]*>([^<]+)<\/h1>/gi;
    var title = html?.match(titleRegex)?.[1] 
    //extract title between h1 tags
    title = title?.replace(/<[^>]*>/g, "")?.replace("Transcript of ", "")?.trim();

    // Author regex with "Author :" prefix

    const authorRegex = /Author\s*:\s*<a[\s\S]*?>\s*(.*?)\s*<\/a\s*>/;
    var author_cite = html.match(authorRegex)?.[1];


    const transcriptRegex =
      /<span[^>]*?data-start="([\d.]+)"[^>]*?class="transcript-segment"[^>]*?>[\s\n]*((?:(?!<\/span>).|\n)*?)[\s\n]*<\/span>/gms;

    const matches = Array.from(html.matchAll(transcriptRegex));

    const transcript = matches.map((match) => ({
      text: match[2].replace(/<br\s*\/?>/gi, " ")?.trim(),
      offset: parseFloat(match[1]),
    }));

    const content = transcript.map((item) => item.text).join(" ");
    let timestamps = [];
    let charIndex = 0;

    transcript.forEach((item) => {
      timestamps.push([charIndex, Math.floor(item.offset)]);
      charIndex += item.text.length + 1; // +1 for the space we added
    });




    return { content, title, author_cite, timestamps };
  // } catch (e) {
  //   return { error: 1 };
  // }
}

/**
 * Fetches via tactiq api
 * @param {string} videoId
 * @returns
 */
async function fetchTranscriptTactiq(videoId, options = {}) {
  try {
  
    var data = await (await fetch(
      "https://tactiq-apps-prod.tactiq.io/transcript", {
      "headers": {
        "content-type": "application/json",
      },
      "body": "{\"videoUrl\":\"https://www.youtube.com/watch?v="+
      videoId + "\"}",
      "method": "POST"
    })).text();

    if (data.startsWith("{"))
      data = JSON.parse(data);

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
 * @returns {Object} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @private
 */
export async function fetchViaYoutubeTranscript(videoId, options = {}) {
  const url = "https://youtubetranscript.com/?server_vid2=" + videoId;

  var html = await (await fetch(url)).text();


  const transcriptRegex = /<text start="([\d.]+)" dur="[\d.]+">((?:(?!<\/text>).|\n)*?)<\/text>/gms;
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

async function extractYouTubeDate(videoId, options = {}) {
  var htmlString = await scrapeURL(
    `https://www.youtube.com/watch?v=${videoId}`, options
  );

  //youtube bot limiting
  if (
    htmlString?.error ||
    htmlString.includes('class="g-recaptcha"') ||
    !htmlString.includes('"playabilityStatus":')
  )
    return { error: 1 };

     // Pattern for both absolute and relative dates after id="info"
     htmlString = htmlString?.replace(/\n/g, "");
     const pattern = /id="info"[^>]*>(?:.*?)(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}|\d+\s+(?:second|minute|hour|day|week|month|year)s?\s+ago)/gi;
     const match = htmlString.match(pattern);

     
     if (match) {
         // Extract just the date part using two possible patterns
         const absoluteDatePattern = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}/;
         const relativeDatePattern = /\d+\s+(?:second|minute|hour|day|week|month|year)s?\s+ago/i;
         
         const absoluteMatch = match[0].match(absoluteDatePattern);
         const relativeMatch = match[0].match(relativeDatePattern);
         
         if (absoluteMatch) {
             return absoluteMatch[0];
         } else if (relativeMatch) {
             const relative = relativeMatch[0];
             const [amount, unit] = relative.split(' ');
             
             // Convert relative date to absolute date
             const now = new Date();
             const date = new Date(now);
             
             switch(unit?.toLowerCase()) {
                 case 'second':
                 case 'seconds':
                     date.setSeconds(now.getSeconds() - parseInt(amount));
                     break;
                 case 'minute':
                 case 'minutes':
                     date.setMinutes(now.getMinutes() - parseInt(amount));
                     break;
                 case 'hour':
                 case 'hours':
                     date.setHours(now.getHours() - parseInt(amount));
                     break;
                 case 'day':
                 case 'days':
                     date.setDate(now.getDate() - parseInt(amount));
                     break;
                 case 'week':
                 case 'weeks':
                     date.setDate(now.getDate() - (parseInt(amount) * 7));
                     break;
                 case 'month':
                 case 'months':
                     date.setMonth(now.getMonth() - parseInt(amount));
                     break;
                 case 'year':
                 case 'years':
                     date.setFullYear(now.getFullYear() - parseInt(amount));
                     break;
             }
             
             // Format the date in YouTube style (MMM DD, YYYY)
             const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
             const formatted = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
             
             return formatted;
         }
     }
     
     return null;
 }

 

async function fetchTranscriptOfficialYoutube(videoId, options = {}) {
  const videoPageBody = await scrapeURL(
    `https://www.youtube.com/watch?v=${videoId}`, options
  );

  //youtube bot limiting
  if (
    videoPageBody?.error ||
    videoPageBody.includes('class="g-recaptcha"') ||
    !videoPageBody.includes('"playabilityStatus":')
  )
    return { error: 1 };


  var videoObj = videoPageBody
    .replace("\n", "")
    .split('"captions":')?.[1]
    ?.split(',"videoDetails')[0];


    if (!videoObj) return { error: 2 };


  const captions = JSON.parse(videoObj)?.playerCaptionsTracklistRenderer;

  if (!captions?.captionTracks) return { error: 3 };

  const track = captions.captionTracks.find(
    (track) => track.languageCode === "en"
  );

  if (!track) return { error: 4 };

  // alert(track.baseUrl)
  options.proxy = null;
  const transcriptBody = await scrapeURL(track.baseUrl, options);

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
