const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UserController");
const {verifyToken} = require("../middlewares/authenToken");
const {checkAdmin, checkPermisson} = require("../middlewares/Authorization");


router.post("/createUser",verifyToken, checkPermisson, usersController.create);
router.post("/:id/changeUsername",verifyToken, checkPermisson,usersController.changeUsername);
router.post("/:id/changePassword",verifyToken, checkPermisson,usersController.changePassword);
router.post("/:id/changeStatus",verifyToken, checkPermisson,usersController.changeStatus);
// router.post("/reset_password", usersController.resetPassword);
router.put("/:id/updateUser",verifyToken, usersController.updateUser);

router.delete("/:id/deleteUser",verifyToken, checkPermisson, usersController.deleteUser);
router.post("/:id/changeRole",verifyToken, checkPermisson, usersController.changeRole);
//
router.get("/listUser",verifyToken, checkPermisson, usersController.listUsers);
// Lây thông tin 1 nhan vien
router.get("/:id/getUser",verifyToken, usersController.getUser);
// lấy all thong tin 1 nhan vien
router.get("/:id/getUserAll",verifyToken, checkPermisson, usersController.getUserAll);
router.get("/:id/listMissPermission",verifyToken, checkPermisson, usersController.listMissPermission);
router.get("/listPermission",verifyToken, usersController.listPermission);
router.get("/:id/permissionsUser",verifyToken, checkPermisson, usersController.permissionsUser);
router.post("/:id/addPermission",verifyToken, checkPermisson, usersController.addPermission);
router.delete("/:id/deletePermission",verifyToken, checkPermisson, usersController.deletePermission);



module.exports = router;
