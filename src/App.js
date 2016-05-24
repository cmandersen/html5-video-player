function CMAVideo(element, options) {
    var This = this;
    this.element = element;
    this.options = options || {};

    this.clickToPause = this.options.clickToPause == undefined ? true : this.options.clickToPause;
    this.progressBar = this.options.progressBar;

    new SmartProperty(this, 'src', {
        value: this.element.src,
        afterSet : function(value) {
            This.element.src = value;
            This.element.load();
        }
    });

    new SmartProperty(this, 'controls', {
        value: this.element.controls || false,
        afterSet : function(value) {
            This.element.controls = value;
        }
    });

    new SmartProperty(this, 'time', {
        value: this.element.currentTime || 0,
        beforeGet : function(value) {
            return This.element.currentTime;
        },
        afterSet : function(value) {
            This.element.currentTime = value;
        }
    });

    new SmartProperty(this, 'autoplay', {
        value: this.element.autoplay || false,
        afterSet : function(value) {
            This.element.autoplay = value;
        }
    });

    new SmartProperty(this, 'loop', {
        value: this.element.loop || false,
        afterSet : function(value) {
            This.element.loop = value;
        }
    });

    new SmartProperty(this, 'muted', {
        value: this.element.muted || false,
        afterSet : function(value) {
            This.element.muted = value;
        }
    });

    new SmartProperty(this, 'paused', {
        value: this.element.paused || false,
        afterSet : function(value) {
            This.element.paused = value;
            value ? This.pause() : This.play();
        }
    });

    new SmartProperty(this, 'volume', {
        value: this.element.volume,
        afterSet : function(value) {
            This.element.volume = value;
        }
    });

    new SmartProperty(this, 'progress', {
        value: 0,
        afterSet : function(value) {
            if(This.progressBar != undefined) {
                This.progressBar.style.width = value + '%';
            }
        }
    });

    this.element.addEventListener('durationchange', function(evt) {
        This.duration = This.element.duration;
    });

    this.element.addEventListener('click', function(evt) {
        if(This.clickToPause)
            This.paused = !This.paused;
    });

    this.element.addEventListener('progress', function(evt) {
        This.progress = This.time / This.duration * 100;
    });
}

CMAVideo.prototype = {
    play : function() {
        this.element.play();
    },

    pause : function() {
        this.element.pause();
    },

    mute : function(val) {
        val = val == undefined ? true : val;
        this.muted = val;
    },

    unmute : function() {
        this.muted = false;
    },

    load : function() {
        this.element.load();
    }
};