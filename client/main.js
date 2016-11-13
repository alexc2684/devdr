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
	console.log(this.data.name)
})

Template.profilePic.helpers({
	style: function() {
		return Template.instance().style.get()
	},
	letter: function() {
		var n = Template.instance().data.name
		if(n == "") {
			return "#"
		} else {
			return n.substring(0, 1).toUpperCase()
		}
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

Template.card.helpers({
	parse: function(obj) {
		return JSON.parse(obj)
	}
})

Meteor.subscribe('allEmails');

var infoInstance = null
Template.info.onCreated(function () {
	this.subscribe('user')
	infoInstance = this
	console.log(this)
})
Template.info.helpers({
	getNext: function() {
		var instance = Template.instance()
		infoInstance = instance
		if(!instance.people) {
			var id = Meteor.users.findOne(Meteor.userId()).userId;
			console.log(id)
			var people = UserData.find({_id: {$ne: id}})
			people = people.fetch()
			var you = UserData.findOne(id)
			instance.people = order_people(you.interests, people)
			console.log(instance.people)
		}
		var current = instance.people.shift()
		instance.currentName = new ReactiveVar(current.name)
		instance.currentInterests = new ReactiveVar(current.interests)
		console.log(instance)
	},
	name: function() {
		return Template.instance().currentName.get()
	},
	interests: function() {
		return Template.instance().currentInterests.get()
	},
	current: function() {
		return Template.instance().current
	},
	users: function() {
		return UserData.find()
	},
	json: function(obj) {
		return JSON.stringify(obj)
	}
});

Template.info.events({
	click: function(e, instance) {
		buttonText = $(e.target)[0].innerText
		console.log(instance)
		if(buttonText == "1!" || buttonText == "0!") {
			if(buttonText == "1!") {
				
			}
			var current = instance.people.shift()
			instance.currentName.set(current.name)
			instance.currentInterests.set(current.interests)
			console.log(current)
		}
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
Template.home.onCreated(function() {
    this.subscribe('user')
	this.profileData = null
})
Template.home.helpers({
    equals: function(v1, v2) {
        return (v1 === v2);
    }
});
Template.home.helpers({
	'getProfile': function() {
		// var currId = Meteor.userId();
		// console.log(currId);
		if(!Template.instance().profileData) {
			var id = Meteor.users.findOne(Meteor.userId()).userId;
			Template.instance().profileData = UserData.findOne({_id: id})
		}
		console.log(Template.instance().profileData)
		return Template.instance().profileData
	}
});

Template.home.events({
	'submit form': function(event, instance){
		console.log("Submitted");
		event.preventDefault();
		var id = instance.profileData._id
		console.log(id);

		UserData.update({_id: id}, {$set: {
				name: event.target.name.value,
				bio: event.target.bio.value,
				devtype: {
					frontend: event.target.myForm[0].checked,
					backend: event.target.myForm[1].checked,
				  fullstack: event.target.myForm[2].checked,
				  datascience: event.target.myForm[3].checked,
				  design: event.target.myForm[4].checked
				},
				skills: event.target.skills.value.replace(/\s+/g, '').split(","),
				interests: event.target.interests.value.replace(/\s+/g, '').split(","),
				github: event.target.github.value,
			}
		},{upsert: true});
		Router.go('/profile');
}
});

UI.registerHelper('checkedIf', function(val) {
  return val ? 'checked' : '';
});


function order_people(interests, people) {
	var updated_people = [];
	people.forEach(function(element) {
		updated_people.push({
			_id: element._id,
			priority: calc_compatibility(interests, element.interests),
			name: element.name,
			interests: element.interests
		})
	});
	updated_people.sort(function(x, y) {
		return y.priority - x.priority
	});

	return updated_people;
}

function calc_compatibility(yours, theirs) {
	var their_interests = []; // load this in later
	var their_devtype = [];
	var their_skills = [];

	var compatibility = 0;
	yours.forEach(function(element) {
		compatibility += interest_matches(theirs, element);
	});
	return compatibility;
}

function interest_matches(their_interests, specific_interest) {
	if (their_interests.find(function(element) {
		return element == specific_interest;
	}) == undefined) {
		return 0;
	} else {
		return 1;
	}
}
