/*
 * @Description  : 入口
 * @Author       : huyanyan
 * @Date         : 2022-04-08 15:55:24
 */
const Koa = require("koa");

const app = new Koa();

const router = require("./src/router");

var api = function (req, res, next) {
  // utils.getClientIP(req)
  let ip = 1221;
  console.log(
    `====================${ip}, ${req.originalUrl}====================`
  );
  console.log(`====================参数start====================`);
  req.body = Object.assign({}, req.body, req.query, req.params, {
    ip: ip,
  });
  console.log("body", JSON.stringify(req.body));
  console.log(`====================参数end====================`);
  next();
};
console.log(223232);
var user = require("./src/router/user");

router.use("/user", api, user);

app.listen("3000", function () {
  console.log("The server is running at *: 8111");
});
