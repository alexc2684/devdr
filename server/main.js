import { Meteor } from 'meteor/meteor';
var randomColor = require("randomcolor")
import { Session } from 'meteor/session';

Meteor.startup(() => {
  var currentProfile = {}
  Meteor.publish('data', function(){
      return UserData.find();
  });
});

Accounts.onCreateUser((options, user) => {
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
  return user;
});
