const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UserController");
const {verifyToken} = require("../middlewares/authenToken");
const {checkAdmin} = require("../middlewares/Authorization");


router.post("/create", checkAdmin, usersController.create);
router.post("/:id/change_username",checkAdmin,usersController.changeUsername);
router.post("/:id/change_password",checkAdmin,usersController.changePassword);
// router.post("/reset_password", usersController.resetPassword);
router.put("/:id",verifyToken, usersController.updateUser);
router.delete("/:id",checkAdmin, usersController.deleteUser);
router.post("/:id",checkAdmin, usersController.changeRole);
//
router.get("/",checkAdmin, usersController.listUsers);

module.exports = router;
