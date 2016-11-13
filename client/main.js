import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { UserData } from '../lib/collections.js';

import './main.html';

Template.match.helpers({
	users: function() {
		return Meteor.users.find()
	}
});

Template.card.helpers({
	parse: function(obj) {
		return JSON.parse(obj)
	}
})

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
