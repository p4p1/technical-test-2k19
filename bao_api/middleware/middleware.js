const jwt = require("jsonwebtoken");
var SECRETKEY = "cc6b9744e135bc240ed7bb10c6095ee8"; // md5 hash of Leo Smith

module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRETKEY);

      req.userData = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send({
        msg: "Your session is not valid!"
      });
    }
  },
  validateRegister: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
      console.log(req.body);
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars"
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with min. 6 chars"
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: "Both passwords must match"
      });
    }
    next();
  },
  debug: (req, res, next) => {
    next();
  }
};


