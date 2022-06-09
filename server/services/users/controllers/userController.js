const { hashPass } = require("../helpers/bcrypt");
const User = require("../models/userModel");

class Controller {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      users.forEach((el) => {
        delete el.password;
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const user = await User.findOne(req.params.id);
      if (!user) {
        throw {
          status: 404,
          message: "User not found",
          name: "Not Found",
        };
      }
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const hashed = hashPass(password);
      const user = await User.create({
        username,
        email,
        password: hashed,
        phoneNumber,
        address,
        role: "Admin",
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const isUser = await User.findOne(req.params.id);
      if (!isUser) {
        throw {
          status: 404,
          message: "User not found",
          name: "Not Found",
        };
      }
      const user = await User.delete(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
