const passport = require("passport");

exports.login = (req, res, next) => {
  res.render("login");
};

exports.sessionCreate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(e);
    } else if (!user) {
      res.render("login", { error: info.message });
    } else {
      req.login(user, (err) => {
        if (err) {
          next(e);
        } else {
          if (req.originalUrl === "/auth/login/profil") {
            res.redirect("/profil");
          } else {
            res.redirect("/");
          }
        }
      });
    }
  })(req, res, next);
};

exports.sessionDelete = (req, res, next) => {
  try {
    req.logout(() => {
      res.redirect("/");
    });
  } catch (e) {
    next(e);
  }
};
