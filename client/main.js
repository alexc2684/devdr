import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
randomColor = require("randomcolor")
// import { UserData } from '../lib/collections.js';
import { Session } from 'meteor/session';
import './main.html';

var matchPage = false
Template.matchPage.onCreated(function() {
	this.current = new ReactiveVar(false)
	matchPage = this
})

Meteor.subscribe("data");

Template.matchPage.helpers({
	users: function() {
		//return [1,2,3,4,5]
		return UserData.find()
	},
	current: function() {
		return Template.instance().current.get()
	}
});

Template.profilePic.onCreated(function() {
	this.style = new ReactiveVar("line-height: 80px")
})

Template.profilePic.helpers({
	style: function() {
		return Template.instance().style.get()
	}
})

Template.profilePic.events({
	click: function(event, instance) {
		if(matchPage) {
			current = matchPage.current.get()
			if(current) {
				current.style.set("line-height: 80px")
			}
			matchPage.current.set(instance)
			instance.style.set("border: 3px solid black;")
		}
	}
})

Template.test.helpers({
	parse: function(obj) {
		return JSON.parse(obj)
	}
})

Meteor.subscribe('allEmails');

Template.info.helpers({
  allUsers(){ 
  	console.log(UserData.find({}));
  	return UserData.find({}); },
  email(){ 
  	console.log(this);
  	return this.name; }
});
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

Template.home.helpers({
	'getProfile': function() {
		// var currId = Meteor.userId();
		// console.log(currId);
		console.log(Meteor.UserData.find());
		return UserData.find({_id: "dpmYyXkHm2CjmTWpT"});
	}
});

Template.home.events({
	'submit form': function(event){
		console.log("Submitted");
		event.preventDefault();
		UserData.insert({
				name: event.target.name.value,
				bio: event.target.bio.value,
				devtype: {
					frontend: event.target.myForm[0].checked,
					backend: event.target.myForm[1].checked,
				  fullstack: event.target.myForm[2].checked,
				  datascience: event.target.myForm[3].checked,
				  design: event.target.myForm[4].checked
				},
				skills: event.target.skills.value.split(", "),
				interests: event.target.interests.value.split(", "),
				github: event.target.github.value,
		});
}
});
