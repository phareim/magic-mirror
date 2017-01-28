//helloworld.js:

Module.register("hello", {

  // Module config defaults.
  defaults: {
    compliments: {
      morning: [
        "God morgen!",
        "Du er en god skolevenn!",
        "Ha en fin skoledag!"
      ],
      afternoon: [
        "Ha en god lunsj",
        "Alle trenger en skolevenn",
        "Så grei du er"
      ],
      evening: [
        "Gå forsiktig, noen er glad i deg",
        "Ha en fin dag!",
        "Matte er gøy!",
        "Husk å lese øveord"
      ]
    },
    updateInterval: 15000,
    remoteFile: null,
    fadeSpeed: 4000
  },

  // Set currentweather from module
  currentWeatherType: "",

  // Define required scripts.
  getScripts: function() {
    return ["moment.js"];
  },

  // Define start sequence.
  start: function() {
    Log.info("Starting module: " + this.name);

    this.lastComplimentIndex = -1;

    if (this.config.remoteFile != null) {
      this.complimentFile((response) => {
        this.config.compliments = JSON.parse(response);
      });
    }

    // Schedule update timer.
    var self = this;
    setInterval(function() {
      self.updateDom(self.config.fadeSpeed);
    }, this.config.updateInterval);
  },

  /* randomIndex(compliments)
   * Generate a random index for a list of compliments.
   *
   * argument compliments Array<String> - Array with compliments.
   *
   * return Number - Random index.
   */
  randomIndex: function(compliments) {
    if (compliments.length === 1) {
      return 0;
    }

    var generate = function() {
      return Math.floor(Math.random() * compliments.length);
    };

    var complimentIndex = generate();

    while (complimentIndex === this.lastComplimentIndex) {
      complimentIndex = generate();
    }

    this.lastComplimentIndex = complimentIndex;

    return complimentIndex;
  },

  /* complimentArray()
   * Retrieve an array of compliments for the time of the day.
   *
   * return compliments Array<String> - Array with compliments for the time of the day.
   */
  complimentArray: function() {
    var hour = moment().hour();
    var compliments = null;

    if (hour >= 3 && hour < 12) {
      compliments = this.config.compliments.morning;
    } else if (hour >= 12 && hour < 17) {
      compliments = this.config.compliments.afternoon;
    } else {
      compliments = this.config.compliments.evening;
    }

    if (this.currentWeatherType in this.config.compliments) {
      compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
    }
    return compliments;

  },

  /* complimentFile(callback)
   * Retrieve a file from the local filesystem
   */
  complimentFile: function(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", this.file(this.config.remoteFile), true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  },

  /* complimentArray()
   * Retrieve a random compliment.
   *
   * return compliment string - A compliment.
   */
  randomCompliment: function() {
    var compliments = this.complimentArray();
    var index = this.randomIndex(compliments);

    return compliments[index];
  },

  // Override dom generator.
  getDom: function() {
    var complimentText = this.randomCompliment();

    var compliment = document.createTextNode(complimentText);
    var wrapper = document.createElement("div");
    wrapper.className = this.config.classes ? this.config.classes :
      "thin xlarge bright";
    wrapper.appendChild(compliment);

    return wrapper;
  }
});
