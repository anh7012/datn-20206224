const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.idUser, idRole: user.idRole },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "20s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.idUser, idRole: user.idRole },
    process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" }
  );
};

const removeToken = (refreshTokens, refreshTokenRm) => {
  let verifySignature = getVerifySignature(refreshTokenRm);
  let position = refreshTokens.search(verifySignature);
  if (position > 0) {
    return refreshTokens.replace("." + verifySignature, "");
  } else if (position === 0) {
    if (refreshTokens.length === refreshTokenRm.length) {
      return null;
    } else {
      return refreshTokens.replace(verifySignature + ".", "");
    }
  } else {
    return "not found";
  }
};

const addToken = (refreshTokens, newRefreshToken) => {
  if (refreshTokens === null) return getVerifySignature(newRefreshToken);
  return refreshTokens + "." + getVerifySignature(newRefreshToken);
};

const getVerifySignature = (refreshToken) => {
  if (refreshToken){
    let arr = refreshToken.split(".");
    return arr[2];
  }

};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  addToken,
  removeToken,
  getVerifySignature
};
