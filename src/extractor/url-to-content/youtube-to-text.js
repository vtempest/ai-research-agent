/**
 * fetch youtube.com video's webpage HTML for embedded transcript
 * if blocked, use scraper of youtubetranscript.com
 * @param {string} videoUrl
 * @param {object} options
 * @param {boolean} options.boolTimestamps=true - true to return timestamps, default true
 * @param {boolean} options.timeout=5 - http request timeout
 * @return {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @category Extractor
 */
export async function extractYoutubeText(videoUrl, options={}) {
  const {
    boolTimestamps = true,
    timeout = 5    
  } = options

  var transcript = await fetchTranscript(videoUrl, options);
  if (transcript.error) transcript = await fetchViaYoutubeTranscript(videoUrl, options);

  var content = "";
  var timestamps = [];
  transcript.forEach(({ offset, text }) => {
    if (boolTimestamps)
      timestamps.push([content.length, Math.floor(offset, 0)]);

    content += text + " ";
  });

  if (!boolTimestamps) return { content };

  content = content
    .replace(/&amp;#39;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');

  var word_count = content.split(" ").length;
  return { content, timestamps, word_count, format: "video" };
}

async function fetchTranscript(videoId, options = {}) {
  const {
    timeout = 5    
  } = options;
  const identifier = getURLYoutubeVideo(videoId);

  const HEADER = {
    headers: {
      "Accept-Language": "en",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)",
    },
     signal: AbortSignal.timeout(timeout * 1000) 
  };

  const videoPageResponse = await fetch(
    `https://www.youtube.com/watch?v=${identifier}`,
    HEADER
  );
  const videoPageBody = await videoPageResponse.text();

  const captions = JSON.parse(
    videoPageBody
      .split('"captions":')?.[1]
      ?.split(',"videoDetails')[0]
      .replace("\n", "")
  )?.playerCaptionsTracklistRenderer;

  if (
    videoPageBody.includes('class="g-recaptcha"') ||
    !videoPageBody.includes('"playabilityStatus":') ||
    !captions?.captionTracks
  )
    return { error: true };

  const track = captions.captionTracks.find(
    (track) => track.languageCode === "en"
  );

  if (!track) return { error: true };

  const transcriptResponse = await fetch(track.baseUrl, HEADER);

  if (!transcriptResponse.ok) return { error: true };

  const transcriptBody = await transcriptResponse.text();
  const results = [
    ...transcriptBody.matchAll(
      /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g
    ),
  ];

  return results.map(([, start, duration, text]) => ({
    text,
    duration: parseFloat(duration),
    offset: parseFloat(start),
    lang: track.languageCode,
  }));
}

/**
 * Get YouTube transcript of most YouTube videos,
 * except if disabled by uploader
 * fetch-based scraper of youtubetranscript.com
 *
 * @param {string} videoUrl
 * @return {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 * @private
 */
export async function fetchViaYoutubeTranscript(videoUrl, options={}) {
  const {
    timeout = 5    
  } = options;
  const videoId = getURLYoutubeVideo(videoUrl);
  const url = "https://youtubetranscript.com/?server_vid2=" + videoId;

  const response = await fetch(url,
    { signal: AbortSignal.timeout(timeout * 1000) }
  );
  const html = await response.text();

  const transcriptRegex = /<text data-start="([\d.]+)".*?>(.*?)<\/text>/g;
  const matches = [...html.matchAll(transcriptRegex)];

  const transcript = matches.map((match) => ({
    text: decodeHTMLEntities(match[2]),
    offset: parseFloat(match[1]),
  }));

  const content = transcript.map((item) => item.text).join(" ");
  const timestamps = [];
  let charIndex = 0;

  transcript.forEach((item) => {
    timestamps.push([charIndex, item.offset]);
    charIndex += item.text.length + 1; // +1 for the space we added
  });

  return { content, timestamps };
}

// Helper function to decode HTML entities
function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Test if URL is to youtube video and return video id if true
 * @param {string} url - youtube video URL
 * @return {string|boolean} video ID or false
 * @private
 */
export function getURLYoutubeVideo(url) {
  var match = url?.match(
    /(?:\/embed\/|v=|v\/|vi\/|youtu\.be\/|\/v\/|^https?:\/\/(?:www\.)?youtube\.com\/(?:(?:watch)?\?.*v=|(?:embed|v|vi|user)\/))([^#\&\?]*).*/
  );
  return match ? match[1] : false;
}
