Router.route('/', function () {
  this.render('home');
});

Router.route('/info', function () {
  this.render('info');
});

Router.route('/match', function () {
  this.render('match');
});
