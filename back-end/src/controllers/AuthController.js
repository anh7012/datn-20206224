const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  getVerifySignature,
} = require("../utils/token");

const authController = {
  // [POST] /users/login
  login: async (req, res, next) => {
    try {
      const user = await User.getByUsername(req.body.username);
      if (!user) {
        res.json({
          code: 9992,
          data: { message: "Tài khoản không tồn tại" },
        });
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        const accessToken = generateAccessToken(user); //
        const refreshToken = generateRefreshToken(user); //Lưu trữ ở cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        let rs = await User.addToken({
          id: user.idUser,
          refreshTokens: user.refreshTokens,
          refreshToken: refreshToken,
        });

        // const { password, refreshTokens, ...other } = user;
        const { idUser, idRole, username, email } = user;
        res.json({
          code: 1000,
          data: {
            user: { idUser, idRole, username, email },
            accessToken,
            message: "Đăng nhập thành công",
          },
        });
      } else {
        res.json({ code: 1006, data: { message: "Sai mật khẩu" } });
      }
    } catch (error) {
      console.log(error)
      res.json({ code: 9999, data: { message: "Không thể đăng nhập" }});
    }
  },

  // Refresh Token
  reqRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.json({
        code: 9992,
        data: { message: "Bạn chưa đăng nhập!" },
      });
    }
    try {
      const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.getByIdUser(data.id);
      const verifySignature = getVerifySignature(refreshToken);
      const refreshTokens = user.refreshTokens;
      if (!refreshTokens.includes(verifySignature)) {
        return res.json({
          code: 9992,
          data: { message: "Refresh token is not valid" },
        });
      }
      let rs = await User.addToken({
        id: user.idUser,
        refreshTokens: user.refreshTokens,
        refreshToken: refreshToken,
      });
      // Create new tokens
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.json({
        code: 1000,
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      console.log(error);
      return res.json({
        code: 9992,
        data: { message: "Token không hợp lệ!" },
      });
    }
  },
  logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      res.clearCookie("refreshToken");
      const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.getByIdUser(data.id);
      await User.removeToken({
        id: user.idUser,
        refreshTokens: user.refreshTokens,
        refreshTokenRm: refreshToken,
      });
      return res.json({ code: 1000, data: { message: "Logout success" } });
    } catch (error) {
      res.json({ code: 9999, error: error.message });
      return
    }
  },
};


module.exports = authController;
