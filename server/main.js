import { Meteor } from 'meteor/meteor';
var randomColor = require("randomcolor")

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser((options, user) => {
  // if (! user.services.github) {
  //   throw new Error('Expected login with Facebook only.');
  // }

  // const { first_name, last_name } = user.services.facebook;
  // user.UserD = first_name[0].toUpperCase() + last_name[0].toUpperCase();
	var userObject = {
		name: "",
		color: randomColor(),
		bio: "",
		devtype: {
			frontend: false,
			backend: false,
			fullstack: false,
			datascience: false,
			design: false
		},
		interests: [],
		skills: [],
		github: ""
	}
	user.userId = UserData.insert(userObject);
  return user
  // Don't forget to return the new user object at the end!
  // return user;
});
