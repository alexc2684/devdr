import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { UserData } from '../lib/collections.js';
import { Session } from 'meteor/session';
import './main.html';

Meteor.subscribe("data");

Template.match.helpers({
	users: function() {
		return Meteor.users.find()
	}
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
