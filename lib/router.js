import { Template } from 'meteor/templating';
import { UserData } from '../lib/collections.js';

Router.configure({
  layoutTemplate:"main",
  //notFoundTemplate:"notFoundTemplate",
  //loadingTemplate:"loadingTemplate",
});
Router.route('/', {
  name: 'home',
  template: 'home',
});

Router.route('/profile', function () {
  this.render('profileForm');
});

Router.route('/matches', function () {
  this.render('info');
});
