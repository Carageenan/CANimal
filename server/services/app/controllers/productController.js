const { Product, Image, Category, sequelize } = require("../models");
const { Op } = require("sequelize");
const e = require("express");

class Controller {
  static async getAllProduct(req, res, next) {
    try {
      const { page, size, search, filter } = req.query;
      let option;
      let set = 0;
      if (page > 1) {
        set = +size * (+page - 1);
      }
      if (!page) {
        option = {
          order: [["createdAt", "ASC"]],
        };
      } else if (!search && !filter) {
        option = {
          limit: +size,
          offset: set,
          order: [["createdAt", "ASC"]],
        };
      } else if (search && !filter) {
        option = {
          limit: +size,
          offset: set,
          order: [["createdAt", "ASC"]],
          where: { name: { [Op.iLike]: `%${search}%` } },
        };
      } else if (!search && filter) {
        option = {
          limit: +size,
          offset: set,
          order: [["createdAt", "ASC"]],
          where: { categoryId: filter },
        };
      } else if (search && filter) {
        option = {
          limit: +size,
          offset: set,
          order: [["createdAt", "ASC"]],
          where: {
            name: { [Op.iLike]: `%${search}%` },
            category: filter,
          },
        };
      }
      const products = await Product.findAll(option);
      console.log(products);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getProductByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const isCategory = await Category.findOne({
        where: {
          name: category,
        },
      });
      if (!isCategory) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Category not found",
        };
      }
      const products = await Product.findAll({
        where: {
          categoryId: isCategory.id,
        },
        include: {
          model: Category,
        },
      });
      if (!products) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      }
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        include: {
          model: Image,
          where: {
            productId: id,
          },
        },
        where: {
          id,
        },
      });
      if (!product) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, anotherImg } = req.body;
      const createdAt = new Date();
      const updatedAt = new Date();
      const slug = name.toLowerCase().split(" ").join("-");
      const newProduct = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId: 1, //hardcode karena pakai API GATEWAY harusnya req.identify.id
          slug,
          createdAt,
          updatedAt,
        },
        {
          transaction: t,
        }
      );
      const newImage = await Image.create(
        {
          productId: newProduct.id,
          imgUrl: anotherImg,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res.status(201).json({
        message: "Product created successfully",
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const t = await sequelize.transaction();
      const { id } = req.params;
      const { name, description, price, mainImg, categoryId, anotherImg } = req.body;
      const updatedAt = new Date();
      const slug = name.toLowerCase().split(" ").join("-");
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      if (!product) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      }
      const newProduct = await product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          slug,
          updatedAt,
        },
        {
          transaction: t,
        }
      );
      const newImage = await Image.create(
        {
          productId: newProduct.id,
          imgUrl: anotherImg,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const t = await sequelize.transaction();
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      if (!product) {
        throw {
          code: 404,
          name: "Not Found",
          message: "Product not found",
        };
      }
      await product.destroy({
        transaction: t,
      });
      await Image.destroy({
        where: {
          productId: id,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = Controller;
