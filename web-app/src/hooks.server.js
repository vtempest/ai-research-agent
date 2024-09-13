// // Import your static files directly
// import favicon from '../static/favicon.ico';
// import siteManifest from '../static/site.webmanifest';
// import installer from "../static/download/qwksearch_0.1.1_x64_en-US.msi";

// export const handle = async ({ event, resolve }) => {
//   const staticFiles = {
//     '/favicon.ico': { content: favicon, type: 'image/x-icon' },
//     '/download/qwksearch_0.1.1_x64_en-US.msi': { content: installer, type: 'application/octet-stream' },
//     '/site.webmanifest': { content: siteManifest, type: 'application/manifest+json' },
//   };
  
//   if (event.url.pathname in staticFiles) {
//     const file = staticFiles[event.url.pathname];
//     return new Response(file.content, {
//       headers: {
//         'Content-Type': file.type,
//         'Cache-Control': 'public, max-age=3600'
//       }
//     });
//   }
  
//   return resolve(event);
// };