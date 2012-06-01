(function(){
  var itInvokes = function(expectedMethod, callback) {
    test("it invokes " + expectedMethod + " method", function() {
      var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
      var mock = sinon.mock(subject);
      mock.expects(expectedMethod).once();
      callback(subject);
      mock.verify();
    });
  };

  module("_V_.PlaylistEngine#incrementCurrentIndex");

  test("increments currentIndex", function(){
    var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
    equal(subject.currentIndex, 0);
    subject.incrementCurrentIndex();
    equal(subject.currentIndex, 1);
  });

  test("sets current index to 0 when it was at the end of the videos array",
       function() {
         var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
         subject.currentIndex = 1;
         equal(subject.currentIndex, 1);
         subject.incrementCurrentIndex();
         equal(subject.currentIndex, 0);
       });



  module("_V_.PlaylistEngine#decrementCurrentIndex");

  test("decrements currentIndex", function(){
    var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
    subject.currentIndex = 1;
    equal(subject.currentIndex, 1);
    subject.decrementCurrentIndex();
    equal(subject.currentIndex, 0);
  });

  test("sets current index to last element of the videos array when it was at 0",
       function() {
         var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
         subject.videos = [0, 1];
         subject.currentIndex = 0;
         equal(subject.currentIndex, 0);
         subject.decrementCurrentIndex();
         equal(subject.currentIndex, 1);
       });



  module("_V_.PlaylistEngine#play");

  test("sets new currentIndex", function() {
    var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
    equal(subject.currentIndex, 0);
    sinon.stub(subject, "updateVideo")
    subject.play(1);
    equal(subject.currentIndex, 1);
  });

  itInvokes("updateVideo", function(subject) {
    subject.play();
  });



  module("_V_.PlaylistEngine#pause");

  test("invokes player's pause() method", function() {
    var player = mkPlayer();
    var subject = new _V_.PlaylistEngine(player, mkPlaylist());
    var mock = sinon.mock(player);
    mock.expects("pause").once();
    subject.pause();
    mock.verify();
  });



  module("_V_.PlaylistEngine#next");

  itInvokes("updateVideo", function(subject) {
    subject.next();
  });

  itInvokes('incrementCurrentIndex', function(subject) {
    sinon.stub(subject, "updateVideo")
    subject.next();
  });



  module("_V_.PlaylistEngine#prev");

  itInvokes("updateVideo", function(subject) {
    subject.prev();
  });

  itInvokes('decrementCurrentIndex', function(subject) {
    sinon.stub(subject, "updateVideo")
    subject.prev();
  });



  module("_V_.PlaylistEngine#reload");

  itInvokes("pause", function(subject) {
    subject.reload();
  });



  module("_V_.PlaylistEngine#updateVideo");

  itInvokes("updateVideoSrc", function(subject) {
    subject.updateVideoPoster = function(){};
    subject.updateVideo();
  });

  itInvokes("updateVideoPoster", function(subject) {
    subject.updateVideo();
  });

  itInvokes("reload", function(subject) {
    sinon.stub(subject, "updateVideoPoster")
    subject.updateVideo();
  });



  module("_V_.PlaylistEngine#updateVideoPoster");

  (function() {
    var player = mkPlayer();
    var subject = new _V_.PlaylistEngine(player, mkPlaylist());
    var mock = sinon.mock(player);

    test("invokes player's src() method", function() {
      mock.expects("src").once();
      subject.updateVideoSrc();
      mock.verify();
    });

    test("invokes player's triggerReady() method", function() {
      mock.expects("triggerReady").once();
      subject.updateVideoSrc();
      mock.verify();
    });
  })();



  module("_V_.PlaylistEngine#updateVideoPoster");

  test("sets new poster", function() {
    var subject = new _V_.PlaylistEngine(mkPlayer(), mkPlaylist());
    equal(subject.player.tag.poster, "poster");
    subject.updateVideoPoster();
    equal(subject.player.tag.poster, "poster.url");
  });

})();
