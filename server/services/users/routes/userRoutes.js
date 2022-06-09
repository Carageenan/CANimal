const router = require("express").Router();
const Controller = require("../controllers/userController");

router.get("/", Controller.findAll);
router.post("/", Controller.create);
router.get("/:id", Controller.findOne);
router.delete("/:id", Controller.delete);

module.exports = router;
