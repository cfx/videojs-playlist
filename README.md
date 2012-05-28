Playlist component for [video.js](http://github.com/zencoder/video-js) 3 player

For more info about video.js go to [videojs.com](http://videojs.com)

## Installation:

Add playlist.js and playlist.css to your head tag, just
after videojs:

    <html>
    <head>
      <link href="http://vjs.zencdn.net/c/video-js.css" rel="stylesheet">
      <script src="http://vjs.zencdn.net/c/video.js"></script>

      <link href="design/playlist.css" rel="stylesheet" type="text/css">
      <script src="src/playlist.js"></script>
    </head>
      ....

## Embedding playlist

Playlist should be embedded as a video's data-setup attribute e.g
    
    <video data-setup='{
       "playlist": [
          {"thumb_url":"http://video-js.zencoder.com/oceans-clip.png",
           "poster_url":"http://video-js.zencoder.com/oceans-clip.png",
           "sources":[
              {"src":"http://video-js.zencoder.com/oceans-clip.mp4",
               "type":"video/mp4",
               "media":"",
               "title":""
              },
              {"src":"http://video-js.zencoder.com/oceans-clip.ogv",
               "type":"video/ogg",
               "media":"",
               "title":""
              }
            ]
           }
         ]}'
        ...

## API

API includes basic features like play/pause/next and prev methods:
e.g

    _V_.players.vid1.playlist.play()
    _V_.players.vid1.playlist.next()
    _V_.players.vid1.playlist.prev()
    _V_.players.vid1.playlist.pause()

You can refer to n video by calling playlist.engine.play(index) method:
e.g

    _V_.players.vid1.playlist.engine.play(0)

## Browser compatibility

Tested on Chrome16/FF6/Safari5.1/iphone4S/ipad and
asus tablet (android 3.2)


## TODO

- loop option
- random play option

## Issues

If you have any issues or ideas about improvements, just let me know.



