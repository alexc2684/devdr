UserData = new Mongo.Collection("user_data");

var DataSchema = new SimpleSchema({
  "Name": {
    type: String,
    defaultValue: "",
    label: "Name"
  },
  "Bio": {
    type: String,
    defaultValue: "",
    label: "Brief summary",
    max: 150
  },
  "DevType": {
    type: String,
    allowedValues: ["Frontend", "Backend", "Data Science", "Full Stack", "Design"],
    autoform: {
      afFieldInput: {
        firstOption: "Type",
      }
    }
  }
});
