const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UserController");
const validate = require("../middlewares/validator");
const authenToken = require("../middlewares/authenToken");

router.post("/create", validate.validateEmail, usersController.create);
router.post("/:id/change_username",authenToken.verifyToken,usersController.changeUsername);
router.post("/:id/change_password",authenToken.verifyToken,usersController.changePassword);
// router.post("/reset_password", usersController.resetPassword);
router.put("/:id", usersController.updateUser);
// router.put('/:id/', usersController.updateUser)
router.delete("/:id", usersController.deleteUser);
//


router.get("/", usersController.listUsers);

module.exports = router;
