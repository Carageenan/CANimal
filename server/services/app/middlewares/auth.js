const { readToken } = require("../helpers/jwt");
const { User } = require("../models");

const isLogin = async (req, res, next) => {
  const { access_token } = req.headers;
  const payload = readToken(access_token);
  if (!payload) {
    throw {
      code: 401,
      name: "Unauthorized",
      message: "Invalid token",
    };
  }
  const isUser = await User.findByPk(payload.id);
  if (!isUser) {
    throw {
      code: 401,
      name: "Unauthorized",
      message: "Invalid token",
    };
  }
  req.identify = {
    id: isUser.id,
    role: isUser.role,
  };
  next();
};

module.exports = {
  isLogin,
};
