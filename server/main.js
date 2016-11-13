import { Meteor } from 'meteor/meteor';
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
