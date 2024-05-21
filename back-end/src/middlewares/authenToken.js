const jwt = require("jsonwebtoken");
let User = require("../models/user");
require("dotenv").config();


  // verify Token
  const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(" ")[1];
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, data) => {
          if (err) {
            return res.json({
              code: 9999,
              data: { message: "Token not valid" },
            });
          }
          // Get user from DB
          const user = await User.getByIdUser(data.id);
          if (!user) {
            res.json({ code: 9999, data: { message: "User cannot found" } });
            return;
          }
          req.user = user;
          req.accessToken = accessToken;
          next();
        }
      );
    } else {
      return res.json({
        code: 9999,
        data: { message: "You're not authenticated" },
      });
    }
  }

module.exports = {verifyToken};
