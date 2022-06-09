const express = require("express");
const router = express.Router();
const Controller = require("../controllers/authController");
const { isLogin } = require("../middlewares/auth");

router.post("/register", Controller.adminRegis);
router.post("/login", Controller.adminLogin);

// router.use(isLogin);

router.get("/alluser", Controller.getAllUser);

module.exports = router;
