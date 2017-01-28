'use strict';


Module.register("emo_camera", {

  counter: null,
  // Default module config.
  defaults: {
    selfieInterval: 3,
	setEmotion: function() {
	},
    emailConfig: {
      service: 'Hotmail',
      auth: {
        user: '<name@email.com>',
        pass: '<password>'
      }
    }
  },

  display: true,

  cameraPreview: null,
  snapshot: null,
  camera: null,
  image: null,
  processing: false,
  message: null,
  commands: null,

  getScripts: function() {
    return ["webcam.js"];
  },

  start: function() {
    this.message =
      "Hei!";
    this.sendSocketNotification('INIT_MAILER', this.config);
    console.log('making selfie');
    this.makeSelfie();
  },

  makeSelfie: function() {
    var self = this;
    var timer = 1;
    var interval = setInterval(function() {
      if (timer === 4) {
        //clearInterval(interval);
        self.createSnapshot();
		timer = -1;
      } else {
		if(self.counter) {
			self.counter.innerHTML = timer;
		}
        timer++;
      }
    }, 1000);
  },

  createSnapshot: function() {
    var self = this;
    this.processing = true;
    Webcam.snap(function(data_uri, canvas, context) {
      var data = data_uri;
      if (self.image == null) {
        self.image = document.createElement("img");

        self.image.width = 640;
        self.image.height = 480;
        self.snapshot.appendChild(self.image);
      }
      self.image.src = data_uri;

      var file = self.image.src;


      var BASE64_MARKER = ';base64,';

      var parts = file.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;

      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      file = new Blob([uInt8Array], {
        type: contentType
      });


      var http = new XMLHttpRequest();
	  http.onreadystatechange = function() {
		  if (http.readyState == XMLHttpRequest.DONE) {
			console.log(http.responseText);
			//self.commands.innerHTML = http.responseText;
			var data = JSON.parse(http.responseText);
			
			if(data.length > 1) {
				return self.config.setEmotion("multiple");
			}
			
			var firstFace = data[0];
			var scores = firstFace.scores;
			delete scores.neutral;
			var highestValue = 0;
			var highestEmotion = null;
			for(var key in scores) {
				if(scores[key] > highestValue) {
					highestValue = scores[key];
					highestEmotion = key;
				}
			}
			
			self.config.setEmotion(highestEmotion);
		  }
	}
      var url = "https://api.projectoxford.ai/emotion/v1.0/recognize";
      http.open("POST", url, true);
      //http.setRequestHeader("ocp-apim-subscription-key":"2b12ee0ed92b4fa18d3009b7370b448f");
      http.setRequestHeader("ocp-apim-subscription-key",
        "2b12ee0ed92b4fa18d3009b7370b448f");
      http.setRequestHeader("Content-type",
        "application/octet-stream");


      http.send(file);

	  

      self.cameraPreview.style.display = 'none';
      self.sendSocketNotification('SEND_EMAIL', {
        config: self.config,
        dataUrl: data_uri
      });
      self.commands.innerHTML = "Your selfie will be emailed to you";
      setTimeout(function() {
        self.commands.innerHTML = self.message;
      }, 3000);
      self.processing = false;
    });
  },

  // Override dom generator.
  getDom: function() {

    var wrapper = document.createElement("div");

    if (this.display) {
      // if (this.camera === null) {

      this.camera = document.createElement("div");
      this.counter = document.createElement("div")
      this.counter.style = "text-align: center; padding-bottom: 10px;";
      this.counter.className = "large normal";

      this.camera.appendChild(this.counter);
      this.cameraPreview = document.createElement("div");
      this.camera.appendChild(this.cameraPreview);
      this.snapshot = document.createElement("div");
      this.camera.appendChild(this.snapshot)
      this.commands = document.createElement("div");
      this.commands.innerHTML = this.message;
      this.commands.className = "small light dimmed";
      this.commands.style = "padding-top: 10px;"
      this.camera.appendChild(this.commands);
	  this.camera.style = "display: none;"

      wrapper.appendChild(this.camera);

      Webcam.set({
        width: 640,
        height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90,
        constraints: {
          mandatory: {
            minWidth: 640,
            minHeight: 480
          },
          optional: [{
            minFrameRate: 60
          }]
        }
      });

      Webcam.attach(this.cameraPreview);

    } else {
      if (this.camera != null) {
        Webcam.reset();
        this.camera.style = "visibility:hidden;";
      }

    }

    return wrapper;
  },

  notificationReceived: function(notification, payload, sender) {
    if (notification === "SHOW_CAMERA" && this.display === false) {
      this.display = true;
      this.updateDom(500);
    }

    if (notification === "HIDE_CAMERA" && this.display == true) {
      this.display = false;
      this.updateDom(500);
    }

    if (notification === "SELFIE") {
      if (!this.processing && this.display) {
        this.makeSelfie();
      }
    }

  },

});
