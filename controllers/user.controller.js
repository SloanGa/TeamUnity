const { createUser } = require("../queries/user.queries");

exports.login = (req, res, next) => {
  res.render("login");
};

exports.signin = (req, res, next) => {
  res.render("signin");
};

exports.userCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    // req.login(user, (err) => {
    //   if (err) {
    //     next(e);
    //   } else {
    //     res.redirect("/");
    //   }
    // });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.render("signin", { error: e.message });
    // res.statut(404);
  }
};
