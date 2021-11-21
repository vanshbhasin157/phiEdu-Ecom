const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkRoles =  function (req, res, next) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};
const checkRolesExist = {
    checkRoles: checkRoles
  };

module.exports = checkRolesExist;