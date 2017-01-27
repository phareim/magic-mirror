//helloworld.js:

Module.register("loudness",{
    // Default module config.
    defaults: {
        text: "Du er en god !"
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.config.text;
        return wrapper;
    }
});