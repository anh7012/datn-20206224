const usersRouter = require("./users");
const hosoRouter = require("./hoso");
const authRouter = require("./auth");
const hopdongRouter = require("./hopdong");
const clientRouter = require("./client");
const districtRouter = require("./district");
const dgtdRouter = require("./danhgiatindung");


const route = (app) => {
  app.use("/users", usersRouter);
  app.use("/client", clientRouter);
  app.use("/district", districtRouter);
  app.use("/hoso", hosoRouter);
  app.use("/danhgiatindung", dgtdRouter);
  app.use("/hopdong", hopdongRouter);
  app.use("/", authRouter);
};
module.exports = route;
