const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async adminRegis(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      console.log(req.body);
      const newAdmin = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: "Admin registered successfully",
        data: {
          email: newAdmin.email,
          username: newAdmin.username,
          role: newAdmin.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const isAdmin = await User.findOne({
        where: {
          email,
        },
      });
      if (!isAdmin) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid username or email or password",
        };
      }
      const isMatch = comparePass(password, isAdmin.password);
      if (!isMatch) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid username or email or password",
        };
      }
      const payload = {
        id: isAdmin.id,
        email: isAdmin.email,
        role: isAdmin.role,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        message: "Login successfully",
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAllUser(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
