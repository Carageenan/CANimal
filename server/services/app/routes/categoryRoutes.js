const express = require("express");
const router = express.Router();
const Controller = require("../controllers/categoryController");
const { isLogin } = require("../middlewares/auth");

router.get("/", Controller.getAllCategory);
router.use(isLogin);
router.post("/", Controller.addCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;
