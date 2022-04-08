/*
 * @Description  : 业务接口
 * @Author       : huyanyan
 * @Date         : 2022-04-08 15:56:26
 */
var Koa = require("koa");
var router = Koa.Router();
/**
 * @api {post} /api/user/submit-login 用户登录
 * @apiDescription 用户登录
 * @apiName submit-login
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/user/submit-login
 * @apiVersion 1.0.0
 */
router.post("/submit-login", async (ctx) => {
  //   const loginName = ctx.request && ctx.request.body.loginName;
  //   const loginPass = ctx.request && ctx.request.body.loginPass;
  ctx.body = {
    success: true,
    // result: {
    //   name: loginName,
    //   password: loginPass,
    // },
  };
});

app.use(router.routes());

module.exports = router;
