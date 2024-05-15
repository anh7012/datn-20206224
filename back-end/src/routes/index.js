const usersRouter = require("./users");
const hosoRouter = require("./hoso");
const authRouter = require("./auth");
const hopdongRouter = require("./hopdong");
const clientRouter = require("./client");
const accountRouter = require("./account");
const dgtdRouter = require("./danhgiatindung");


const route = (app) => {
  app.use("/users", usersRouter);
  app.use("/client", clientRouter);
  app.use("/account", accountRouter);
  app.use("/hoso", hosoRouter);
  app.use("/danhgiatindung", dgtdRouter);
  app.use("/hopdong", hopdongRouter);
  app.use("/", authRouter);
  // app.use('/baocao', )
};
module.exports = route;
