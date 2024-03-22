const User = require("../database/models/users.model");

exports.createUser = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password);
    console.log(hashedPassword);

    const user = new User({
      username: body.username,
      team: body.team,
      local: {
        email: body.email,
        password: hashedPassword,
      },
    });
    return user.save();
  } catch (e) {
    throw e;
  }
};

exports.findUserPerEmail = async (email) => {
  return User.findOne({ "local.email": email });
};
