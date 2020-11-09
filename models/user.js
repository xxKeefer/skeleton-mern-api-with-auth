const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, bcrypt: true },
});

userSchema.plugin(require("mongoose-bcrypt"));

module.exports = mongoose.model("User", userSchema);