const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    ///USER NAME////
    if (!req.body.first_name || req.body.first_name.length < 3) {
      return res.status(400).send({
        message: "please enter valid userName",
      });
    }

    ////password min 6 chars

    if (!req.body.password || req.body.password.length < 3) {
      return res.status(400).send({
        message: "please enter valid Password",
      });
    }

    ///password (repeat)must watch

    if (
      !req.body.confirmpassword ||
      req.body.confirmpassword != req.body.password
    ) {
      return res.status(400).send({
        message: "Confirm password doesnt match",
      });
    }
    next();
  },

  islogedin: (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(400).send({
        message: "session is not valid",
      });
    }
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, "SECRETKEY");
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(400).send({
        message: "session is not valid",
      });
    }
  },
};
