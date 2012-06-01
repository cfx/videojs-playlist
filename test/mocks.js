// mocks go here

function mkPlayer() {
  return {
    pause: function(){},
    load:  function(){},
    width: function(){},
    src:   function(sources){},
    triggerReady: function(){},
    options: {
      "playlist": mkPlaylist()
    },
    tag: { poster: "poster" },
    el: { id: "vid1", style: {} }
  };
};

function mkPlaylist(){
  return [
    {"thumb_url":"thumb.url",
     "poster_url":"poster.url",
     "sources":[
       {"src":"video.src",
        "type":"video/mp4",
        "media":"",
        "title":""
       }
     ]
    },
    {"thumb_url":"thumb.url2",
     "poster_url":"poster.url2",
     "sources":[
       {"src":"video.src2",
        "type":"video/mp4",
        "media":"",
        "title":""
       }
     ]
    }
  ]
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
  var playlist = player.options.playlist;
  var obj = new _V_.PlaylistThumb(player, playlist[0], 0);
  return obj;
};
