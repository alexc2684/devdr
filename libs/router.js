import { Template } from 'meteor/templating';
import { UserData } from '../libs/collections.js';

Router.configure({
  layoutTemplate:"main",
  //notFoundTemplate:"notFoundTemplate",
  //loadingTemplate:"loadingTemplate",
});

Router.route('/', {
  name: 'home',
  template: 'home',
});

Router.route('/info', function () {
  this.render('info');
});

Router.route('/match', function () {
  this.render('match');
});
