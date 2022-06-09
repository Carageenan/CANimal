const express = require("express");
const router = express.Router();
const { isLogin } = require("../middlewares/auth");
const Controller = require("../controllers/productController");

router.get("/", Controller.getAllProduct);
router.get("/:id", Controller.getProductById);
router.get("/category/:category", Controller.getProductByCategory);

// router.use(isLogin);

router.post("/", Controller.createProduct);
router.put("/:id", Controller.updateProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
