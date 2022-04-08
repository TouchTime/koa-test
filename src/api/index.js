/*
 * @Description  : 基础API（增删改查）
 * @Author       : huyanyan
 * @Date         : 2022-03-23 09:21:28
 */
const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const KoaStatic = require("koa-static");
const PortIsOccupied = require("../common/net");
const DataBase = require("../common/index");
const HandleHtml = require("../common/handleHtml");
// 解析request的body的功能(post请求)
const bodyParser = require("koa-bodyparser");
const { v4: uuidv4 } = require("uuid");
const dataBaseMode = new DataBase.DataBase();
const path = require("path");
const pathUrl = path.resolve(process.cwd(), "src/mock");
const filePath = path.resolve("./", "src/mock/test.txt");
const app = new Koa();
const router = new Router();
let list = dataBaseMode.getData();
let port = 3000;

// app.use(
//   KoaStatic(
//     path.resolve(process.cwd() + "/src/static"), // 开放的文件夹 __dirname为当前运行文件的目录  目前看来 只能开放文件夹 无法开放单独一个文件
//     {
//       index: false, // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
//       hidden: false, // 是否同意传输隐藏文件
//       defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
//     }
//   )
// );

// console.log(__dirname, path.resolve(process.cwd() + "/src/static"));

// 跨域设置 --最流行的跨域方案CORS（跨域资源共享）

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

// 返回一个文件(Stream)、修改文件名称
router.get("/file", async (ctx) => {
  const { fileName } = ctx.query;
  // 返回文件流
  let file = dataBaseMode.readStreams(filePath, ctx);
  // 设置文件名称
  dataBaseMode.setName(ctx, fileName);
  ctx.body = file;
});

//

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

// 文件上传

// 抽取类
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// add router middleware:
app.use(router.routes());
// console.log(PortIsOccupied, PortIsOccupied.portIsOccupied(port));
// let newPort = "";
// // 监听端口，若是端口被占，则加+1
// if (PortIsOccupied.portIsOccupied(port)) {
//   newPort = Number(port) + 1;
//   console.log(newPort);
// }
app.listen(port);
