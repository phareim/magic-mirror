/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("helloworld", {

	// Default module config.
	defaults: {
		text: "Timeplan"
	},

	getStyles: function() {
		return ["styles.css"];
	},

	start: function() {
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 3000);
	},

	getDom: function() {

		var events = [];
		var wrapper = document.createElement("div");

		if (!this.config.getEmotion() || this.config.getEmotion() === "empty") {
			return wrapper;
		}

		var header = document.createElement("h3");
		header.innerText = "I dag";
		header.styles = "thin bright";
		wrapper.appendChild(header);

		var list = document.createElement("ul");
		var norsk = document.createElement("li");
		norsk.innerText = "08:15 - Norsk";
		list.appendChild(norsk);
		var matte = document.createElement("li");
		matte.innerText = "09:15 - Matte";
		list.appendChild(matte);
		var friminutt = document.createElement("li");
		friminutt.innerText = "10:15 - Friminutt";
		list.appendChild(friminutt);
		var gym = document.createElement("li");
		gym.innerText = "10:30 - Gym";
		var lunsj = document.createElement("li");
		lunsj.innerText = "11:30 - Lunsj";
		list.appendChild(lunsj);
		var krle = document.createElement("li");
		krle.innerText = "12:00 - KRLE";
		list.appendChild(krle);

		wrapper.appendChild(list);

		wrapper.className = "timeplan";
		/*
				if (events.length === 0) {
					wrapper.innerHTML = (this.loaded) ? this.translate("EMPTY") : this.translate(
						"LOADING");
					wrapper.className = "small dimmed";
					return wrapper;
				}

				for (var e in events) {
					var event = events[e];

					var eventWrapper = document.createElement("tr");
					eventWrapper.className = "normal";

					if (this.config.displaySymbol) {
						var symbolWrapper = document.createElement("td");
						symbolWrapper.className = "symbol";
						var symbol = document.createElement("span");
						symbol.className = "fa fa-" + this.symbolForUrl(event.url);
						symbolWrapper.appendChild(symbol);
						eventWrapper.appendChild(symbolWrapper);
					}

					var titleWrapper = document.createElement("td"),
						repeatingCountTitle = "";


					if (this.config.displayRepeatingCountTitle) {

						repeatingCountTitle = this.countTitleForUrl(event.url);

						if (repeatingCountTitle !== "") {
							var thisYear = new Date(parseInt(event.startDate)).getFullYear(),
								yearDiff = thisYear - event.firstYear;

							repeatingCountTitle = ", " + yearDiff + ". " + repeatingCountTitle;
						}
					}

					titleWrapper.innerHTML = this.titleTransform(event.title) +
						repeatingCountTitle;
					titleWrapper.className = "title bright";
					eventWrapper.appendChild(titleWrapper);

					var timeWrapper = document.createElement("td");
					//console.log(event.today);
					var now = new Date();
					// Define second, minute, hour, and day variables
					var oneSecond = 1000; // 1,000 milliseconds
					var oneMinute = oneSecond * 60;
					var oneHour = oneMinute * 60;
					var oneDay = oneHour * 24;
					if (event.fullDayEvent) {
						if (event.today) {
							timeWrapper.innerHTML = this.capFirst(this.translate("TODAY"));
						} else if (event.startDate - now < oneDay && event.startDate - now > 0) {
							timeWrapper.innerHTML = this.capFirst(this.translate("TOMORROW"));
						} else if (event.startDate - now < 2 * oneDay && event.startDate - now >
							0) {
							if (this.translate("DAYAFTERTOMORROW") !== "DAYAFTERTOMORROW") {
								timeWrapper.innerHTML = this.capFirst(this.translate(
									"DAYAFTERTOMORROW"));
							} else {
								timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
							}
						} else {

							if (this.config.timeFormat === "absolute") {
								if ((this.config.urgency > 1) && (event.startDate - now < (this.config
										.urgency * oneDay))) {
									// This event falls within the config.urgency period that the user has set
									timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
								} else {
									timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").format(
										this.config.dateFormat));
								}
							} else {
								timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
							}
						}
					} else {
						if (event.startDate >= new Date()) {
							if (event.startDate - now < 2 * oneDay) {
								// This event is within the next 48 hours (2 days)
								if (event.startDate - now < this.config.getRelative * oneHour) {
									// If event is within 6 hour, display 'in xxx' time format or moment.fromNow()
									timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
								} else {
									// Otherwise just say 'Today/Tomorrow at such-n-such time'
									timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").calendar());
								}
							} else {
								if (this.config.timeFormat === "absolute") {
									if ((this.config.urgency > 1) && (event.startDate - now < (this.config
											.urgency * oneDay))) {
										// This event falls within the config.urgency period that the user has set
										timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
									} else {
										timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").format(
											this.config.dateFormat));
									}
								} else {
									timeWrapper.innerHTML = this.capFirst(moment(event.startDate, "x").fromNow());
								}
							}
						} else {
							timeWrapper.innerHTML = this.capFirst(this.translate("RUNNING")) + " " +
								moment(event.endDate, "x").fromNow(true);
						}
					}
					//timeWrapper.innerHTML += ' - '+ moment(event.startDate,'x').format('lll');
					//console.log(event);
					timeWrapper.className = "time light";
					eventWrapper.appendChild(timeWrapper);

					wrapper.appendChild(eventWrapper);

					// Create fade effect.
					if (this.config.fade && this.config.fadePoint < 1) {
						if (this.config.fadePoint < 0) {
							this.config.fadePoint = 0;
						}
						var startingPoint = events.length * this.config.fadePoint;
						var steps = events.length - startingPoint;
						if (e >= startingPoint) {
							var currentStep = e - startingPoint;
							eventWrapper.style.opacity = 1 - (1 / steps * currentStep);
						}
					}
				}*/

		return wrapper;
	}
});
