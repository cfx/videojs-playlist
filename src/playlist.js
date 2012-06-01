_V_.PlaylistEngine = _V_.Class.extend({
  init: function(player, videos) {
    this.player = player;
    this.videos = videos;
    this.currentIndex = 0;
  },

  play: function(index) {
    if (this.videos.length > 1) {
      this.currentIndex = index;
      this.updateVideo();
    } else {
      throw new Error("Playlist is empty");
    };
  },

  pause: function() {
    this.player.pause();
  },

  next: function() {
    this.incrementCurrentIndex();
    this.updateVideo();
  },

  prev: function() {
    this.decrementCurrentIndex();
    this.updateVideo();
  },

  reload: function() {
    this.pause();
    this.player.load();
    var that = this;
    setTimeout(function() { that.player.play() }, 500);
  },

  incrementCurrentIndex: function() {
    this.currentIndex++;
    // play first video when playlist reaches end
    if (this.currentIndex >= this.videos.length) {
      this.currentIndex = 0;
    };
  },

  decrementCurrentIndex: function() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.videos.length - 1;
    };
  },

  updateVideo: function() {
    this.updateVideoSrc();
    this.updateVideoPoster();
    this.reload();
  },

  updateVideoSrc: function() {
    var sources = this.videos[this.currentIndex].sources;
    // check new sources
    this.player.src(sources);
    this.player.triggerReady();
  },

  updateVideoPoster: function() {
    var newPoster = this.videos[this.currentIndex].poster_url;
    this.player.tag.poster = newPoster;
  }
});

_V_.Playlist = _V_.Component.extend({
  init: function(player, options) {
    this._super(player, options);

    // attach playlist to the player
    this.player.playlist = this;

    // attach engine
    this.engine = new _V_.PlaylistEngine(this.player, this.videos);
    this.show();
  },

  play:  function(index) { this.engine.play(index) },
  pause: function() { this.player.pause() },
  next:  function() { this.engine.next() },
  prev:  function() { this.engine.prev() },

  show: function() {
    this.enableWebkitScrollbar();
    this.setWrapperWidth();
    this.setWidth(this.player.width())

    this.setPosition();
    this._super();
  },

  createElement: function() {
    this.videos = this.getVideos();

    var id = this.player.el.id +"_playlist";
    var el = this._super("div", { id: id });
    this.wrapperEl = this._super("div", { className: "playlist-wrapper" })

    for (i in this.videos) {
      var thumb = new _V_.PlaylistThumb(this.player, this.videos[i], i)
      this.wrapperEl.appendChild(thumb.el);
    };

    // add playlist-wrapper to main playlist tag
    el.appendChild(this.wrapperEl);
    return el;
  },

  hasScrollbar: function() {
    var wrapperWidth = parseInt(this.wrapperEl.style.width);
    var width = parseInt(this.el.style.width);
    return wrapperWidth > width;
  },

  enableWebkitScrollbar: function() {
    // webkit scrollbar doesn't work nice on my android tablet..
    if (_V_.isAndroid()) {
      var cssClass = "vjs-playlist";
    } else {
      var cssClass = "vjs-playlist webkit-scrollbar";
    };
    _V_.addClass(this.el, cssClass);
  },

  getVideos: function() {
    return this.player.options.playlist;
  },

  setWidth: function(width) {
    this.el.style.width = width + "px";
  },

  setWrapperWidth: function() {
    // calculate width based on number of thumbs in the playlist
    this.wrapperEl.style.width = this.calculateWrapperWidth() + "px";
  },

  calculateWrapperWidth: function() {
    return (this.videos.length * 155);
  },

  setPosition: function() {
    if (this.hasScrollbar() && !(_V_.isAndroid())) {
      var val = "-134px";
    } else {
      var val = "-124px";
    };
    this.el.style.bottom = val;
    // add extra margin to main tag when many videos are embeded
    this.player.el.style.marginBottom = val.slice(1);
  },
});

_V_.PlaylistThumb = _V_.Component.extend({
  init: function(player, params, index) {
    this.params = params;
    this.index = index;
    this._super(player);

    _V_.addEvent(this.el, "click", _V_.proxy(this, this.onClick));
  },

  createElement: function(){
    this.el = this._super("img", { src: this.params.thumb_url });
    return this.el;
  },

  onClick: function() {
    this.player.playlist.play(this.index);
  },

  sources: function() {
    return this.params.sources;
  },

  poster: function() {
    return this.params.poster_url;
  }
});

_V_.options.components.playlist = {};
