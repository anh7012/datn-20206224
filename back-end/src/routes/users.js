const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UserController");
const {verifyToken} = require("../middlewares/authenToken");
const {checkAdmin, checkPermisson} = require("../middlewares/Authorization");


router.post("/createUser", checkAdmin, usersController.create);
router.post("/:id/changeUsername",checkAdmin,usersController.changeUsername);
router.post("/:id/changePassword",checkAdmin,usersController.changePassword);
// router.post("/reset_password", usersController.resetPassword);
router.put("/:id/updateUser",verifyToken, usersController.updateUser);
router.delete("/:id/deleteUser",checkAdmin, usersController.deleteUser);
router.post("/:id/changeRole",checkAdmin, usersController.changeRole);
//
router.get("/listUser",checkPermisson, usersController.listUsers);
// Lây thông tin 1 nhan vien
router.get("/:id/getUser",verifyToken, usersController.getUser);

module.exports = router;
