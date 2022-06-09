const { Category } = require("../models");

class Controller {
  static async getAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      console.log(req.body);
      const newCategory = await Category.create({
        name,
      });
      res.status(201).json({
        message: "Category added successfully",
        data: {
          name: newCategory.name,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: {
          id,
        },
      });
      if (!category) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Category not found",
        };
      }
      await category.destroy();
      res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
