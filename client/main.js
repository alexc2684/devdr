import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
randomColor = require("randomcolor")

import './main.html';
var matchPage = false
Template.matchPage.onCreated(function() {
	this.current = new ReactiveVar(false)
	matchPage = this
})

Template.matchPage.helpers({
	users: function() {
		//return [1,2,3,4,5]
		return UserData.find()
	},
	current: function() {
		return Template.instance().current.get()
	}
});

Template.profilePic.events({
	click: function(event, instance) {
		if(matchPage) {
			matchPage.current.set(instance.data.color)
		}
	}
})

Template.test.helpers({
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
