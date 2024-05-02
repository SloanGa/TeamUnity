const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = schema({
  username: { type: String, required: true },
  captain: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  local: {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String },
    password: { type: String, required: true },
    passwordToken: { type: String },
    passwordTokenExpiration: { type: Date },
  },
  avatar: { type: String, default: "/img/avatar.png" },
  team: {
    team_id: { type: String, required: true },
    teamname: { type: String, required: true },
  },
});

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
