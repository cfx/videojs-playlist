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


Next, add 'playlist' object to vjs's components:

    <script type="text/javascript">
      _V_.options.components.playlist = {};
    </script>

Now put your playlist into the body tag. Playlist is represented as a
div tag with img elements. Make sure that you
added proper id attribute to your playlist tag (for video tag  with
id='vid1' playlist is represented as a div with id="vid1_playlist"). Each img element
represents playlist's video item. All necessary data required by
video.js are included in img's data attributes. See dev.example.html


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



