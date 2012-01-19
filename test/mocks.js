// mocks go here

function mkPlayer() {
  return {
    pause: function(){},
    load:  function(){},
    width: function(){},
    src:   function(sources){},
    triggerReady: function(){},
    tag: { poster: "poster" },
    el: { id: "vid1", style: {} }
  };
};

function mkVideo(src) {
  return {
    sources: function(){},
    poster: function() { return src + '/poster' }
  };
};

function videos() {
  return [ mkVideo('src1'), mkVideo('src2') ];
};

function mkThumb() {
  var player = mkPlayer();
  var el = document.getElementById(player.el.id + "_playlist").children[0];
  var options = { index: 0, el: el };
  var obj = new _V_.PlaylistThumb(player, options);
  return obj;
};
