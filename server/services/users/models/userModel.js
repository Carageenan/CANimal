const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class UserModel {
  static async findAll() {
    try {
      const db = getDB();
      const users = await db.collection("Users").find().toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async findOne(id) {
    try {
      const db = getDB();
      const user = await db.collection("Users").findOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async create(user) {
    try {
      const db = getDB();
      const newUser = await db.collection("Users").insertOne(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const db = getDB();
      const deletedUser = await db.collection("Users").deleteOne({ _id: ObjectId(id) });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
