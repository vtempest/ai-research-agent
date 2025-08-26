/**
 * Gets a random artistic background about graph theory 
 * and collective consciousness, 50+ artworks from Anthony Alcaraz
 * @returns {string} The URL of random artistic background
 */
export function getBackgroundArtwork() {
  const backgrounds = [
    "Bv0PBY8.jpeg", // determinism to autonomy
    "DQNbjIZ.jpeg", // hald grid half circe wires
    "LuKUsLE.png", // AI mind in library
    "w7X11Dd.png", // knowledge graph in space
    "MHmVtCr.png", // vector search in space
    "HmnUAee.png", // science lab knowledge graph
    "l1lsV39.png", // agent heads with vectors
    "Ku8F2qc.png", // woman's head with vectors
    "KUEXtwm.png", // robot making a graph on table
    "vvKFPmY.png", // hacker with graph on screen
    "mnJzEQ9.jpeg", // US lady liberty painting 
    "5p8eaEf.png", // arrows and circles emerging
    "VAKuJcG.png", // microcity blue with orange
    "sTMPtQW.png", // nebula waves with graph
    "m0gHbZZ.png", // moon phases ass circle ring
    "cKu7dWQ.png", // colorful tunnel into circle
    "jljejNv.png", // circle ring with color dots
    "ogfefYD.png", // golden gate bridge wires
    "ey5vAae.png", // abstract rectangle on bw
    "kjKN60y.png", // flying balloons in sky
    "twuLrvk.png", // work office flow graph
    "ELILiYt.png", // blue cpu nodes and city
    "9el5qpP.png", // abstract lines on white
    "Up6xTkk.png", // blue head in graph cloud
    "W1XKBo0.png", // people sitting on desks
    "1Y6xvW0.png", // clock and basic shapes
    "JXOytMz.png", // eagle with stem wires
    "IVIzz96.png", // rose black and white 
    "DNiI6pp.png", // abstract art mosaic
    "XDv5s6p.jpeg", // glowing orange with lights
    "2uACPqZ.jpeg", // red vs blue graphs
    "XEKltMF.jpeg", // red blue spread out
    "WHgLfBm.jpeg", // red blue fusion waves
    "QFYM0Fw.jpeg", // red blue fusion heart
    "oN8rtsE.jpeg", // black tree with sub branches
    "9fGnrns.jpeg", // eye ball with wires around
    "2ONJJeW.jpeg", // blue girl with orange waves
    "DO23Va7.jpeg", // student seeing color wave
    "QaKeoXk.jpeg", // monster with legs in graph
    "QU5oCBR.jpeg", // orange ring shooting blue
    "MhlYZmh.jpeg", // pencil making graph on paper
    "ylL1ToB.jpeg", // blonde girl in graph wires
    "AWWsCv8.jpeg", // blue head in graph center
    "Tk9Tzzj.jpeg", // multi-verse spiral of universes
  ];
  return (
    "https://i.imgur.com/" +
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );
}


/**
 * Get a greeting based on the time of day
 * @returns {string} A random greeting
 */
export const getGreeting = () => {
  const hour = new Date().getHours();

  const greetings = {
    morning: [
      "Good morning",
      "Rise and shine",
      "Top of the morning to you",
      "Have a great day ahead",
      "Wishing you a wonderful morning",
    ],
    afternoon: [
      "Good afternoon",
      "Hope your day is going well",
      "Enjoy your afternoon",
      "Greetings for a pleasant afternoon",
      "Wishing you a productive afternoon",
    ],
    evening: [
      "Good evening",
      "Hope you had a great day",
      "Wishing you a relaxing evening",
      "Pleasant evening to you",
      "Enjoy your evening",
    ],
    night: [
      "Greetings at this late hour",
      "Fancy seeing you up so late",
      "Burning the midnight oil, I see",
      "Hope your late-night work is going well",
      "Wishing you a productive night shift",
    ],
  };

  let timeOfDay;
  if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = "afternoon";
  } else if (hour >= 17 && hour < 22) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  const randomIndex = Math.floor(Math.random() * greetings[timeOfDay].length);
  return greetings[timeOfDay][randomIndex];
};
