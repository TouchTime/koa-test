/*
 * @Description  : 基础API（增删改查）
 * @Author       : huyanyan
 * @Date         : 2022-03-23 09:21:28
 */
const Koa = require("koa");
const Router = require("koa-router");
const DataBase = require("../common/index");
const HandleHtml = require("../common/handleHtml");
// 解析request的body的功能(post请求)
const bodyParser = require("koa-bodyparser");
const { v4: uuidv4 } = require("uuid");
const dataBaseMode = new DataBase.DataBase();
const path = require("path");
const pathUrl = path.resolve(process.cwd(), "src/mock");
const fileName = path.resolve("./", "src/mock/test.txt");
const app = new Koa();
const router = new Router();
let list = dataBaseMode.getData();

// 查询用户（支持分页）
router.get("/getName", async (ctx, next) => {
  const { name, page, size } = ctx.query;
  let message = "no name";
  // 有参数则查询，没有则查全部
  if (name) {
    let item = list.find((it) => {
      return it.name === name;
    });
    // 区分是否有当前的名称数据，有就返回，没有则返回 no found
    if (item) {
      ctx.body = item;
      return;
    } else {
      message = "no found";
      ctx.body = { errorMessage: message };
      return;
    }
  }

  // 分页处理 page、size有效的情况下查询
  // slice()处理
  if (page > 0 && size > 0) {
    const allSize = Number(size);
    const allPage = Number(page);
    const index = (allPage - 1) * allSize;
    let lenth = allPage * allSize < list.length ? allSize + index : list.length;
    ctx.body = list.slice(index, lenth);
    return;
  }

  ctx.body = list;
});

// 添加用户
router.post("/addName", async (ctx, next) => {
  let items = ctx.request.body;
  items.id = uuidv4();
  list = [...list, items];
  dataBaseMode.writeData(list);
  ctx.body = list;
});

// 删除用户
router.delete("/delName/:id", async (ctx, next) => {
  const id = ctx.params.id;
  list = list.filter((item) => {
    return item.id !== id;
  });
  dataBaseMode.writeData(list);
  ctx.body = { message: "success", list };
});

// 修改用户信息
router.put("/updateName/:id", async (ctx, next) => {
  const id = ctx.params.id;
  let items = ctx.request.body;
  let index = list.findIndex((item) => item.id === id);

  if (index >= 0) {
    items.age = Number(items.age);
    list[index] = { ...list[index], ...items };
    dataBaseMode.writeData(list);
    ctx.body = { message: "success", list };
  } else {
    ctx.body = { message: "error" };
  }
});

// 返回一个文件(Stream)
router.get("/file", async (ctx) => {
  let file = dataBaseMode.readStreams(fileName);
  ctx.body = file;
});

// 返回一个html
router.get("/", async (ctx) => {
  ctx.set("xxx", "1221");
  let file = "";
  try {
    file = await HandleHtml.readHtmlFile("home");
  } catch (error) {
    file = "no found";
  }
  ctx.body = file;
});

// 修改文件名称
router.put("/rename", async (ctx) => {
  const { name, oldName } = ctx.request.body;
  let message = "";
  try {
    await dataBaseMode.rename(
      path.resolve(pathUrl, oldName),
      path.resolve(pathUrl, name)
    );
    message = "success";
  } catch (error) {
    message = error;
  }

  ctx.body = { message };
});

// 设置response 、304

// 跨域设置

// 文件上传

// 抽取类
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// add router middleware:
app.use(router.routes());
console.log(pathUrl);
app.listen(3000);
