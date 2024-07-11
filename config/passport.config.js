const passport = require("passport");
const app = require("../app");
const User = require("../database/models/users.model");
const LocalStrategy = require("passport-local").Strategy;
const { findUserPerEmail } = require("../queries/user.queries");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await findUserPerEmail(email);
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, {
              message: "Utilisateur ou mot de passe incorrect",
            });
          }
        } else {
          done(null, false, {
            message: "Utilisateur ou mot de passe incorrect",
          });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
