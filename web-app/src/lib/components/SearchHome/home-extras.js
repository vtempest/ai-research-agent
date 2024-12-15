
  //returns a random artistic background for the home page
      // "9OOtfPe", // qwksearch google killer app

  export function getBackground(){
    const backgrounds = [
      "LuKUsLE", // AI mind in library 
      "w7X11Dd", // knowledge graph in space
      "MHmVtCr", // vector search in space
      "HmnUAee", // science lab knowledge graph
      "l1lsV39", // agent heads with vectors
    ];
    return "https://i.imgur.com/" + 
      backgrounds[Math.floor(Math.random() * backgrounds.length)] 
      + ".png";
  }



  /**
   * Get a greeting based on the time of day
   */
export const getGreeting = () => {
    const hour = new Date().getHours();
  
    const greetings = {
      morning: [
        "Good morning",
        "Rise and shine",
        "Top of the morning to you",
        "Have a great day ahead",
        "Wishing you a wonderful morning"
      ],
      afternoon: [
        "Good afternoon",
        "Hope your day is going well",
        "Enjoy your afternoon",
        "Greetings for a pleasant afternoon",
        "Wishing you a productive afternoon"
      ],
      evening: [
        "Good evening",
        "Hope you had a great day",
        "Wishing you a relaxing evening",
        "Pleasant evening to you",
        "Enjoy your evening"
      ],
      night: [
        "Greetings at this late hour",
        "Fancy seeing you up so late",
        "Burning the midnight oil, I see",
        "Hope your late-night work is going well",
        "Wishing you a productive night shift"
      ]
    };
  
    let timeOfDay;
    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = 'afternoon';
    } else if (hour >= 17 && hour < 22) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'night';
    }
  
    const randomIndex = Math.floor(Math.random() * greetings[timeOfDay].length);
    return greetings[timeOfDay][randomIndex];
  };
  


  