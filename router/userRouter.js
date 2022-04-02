const router = require("express").Router();
const controller = require("../controllers/controller");

router.get("/register", controller.registerFormu);

router.post("/register", controller.register);

router.get("/users", controller.users);



module.exports = router;