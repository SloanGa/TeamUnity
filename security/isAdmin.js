exports.isAdmin = (req) => {
  return req.user && req.user.admin ? req.user.admin : null;
};
