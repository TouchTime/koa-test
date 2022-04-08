/*
 * @Description  : 入口文件接口
 * @Author       : huyanyan
 * @Date         : 2022-04-08 15:53:52
 */
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const user = require("./user");

router.use("/user", user);

app.use(router.routes());
console.log(11);
app.listen("3000", function () {
  console.log("The server is running at *: 8111");
});
app.use("/apidoc", app.static("apidoc"));
