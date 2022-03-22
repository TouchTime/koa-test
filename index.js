const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
// 解析request的body的功能(post请求)
const bodyParser = require('koa-bodyparser');
const { v4: uuidv4 } = require('uuid');

const app = new Koa();
const router = new Router();
let fileName = 'database.json';
let type = 'utf8';
let list = JSON.parse(fs.readFileSync(fileName, type));

// add url-route:
router.get('/getName', async (ctx, next) => {
	const { name, page, size } = ctx.query;
	let message = 'no name';
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
			message = 'no found';
			ctx.body = { errorMessage: message };
			return;
		}
	} else {
		// ctx.body = list;
		// return;
	}

	// 分页处理 page、size有效的情况下查询
	// slice()处理
	if (page > 0 && size > 0) {
		// let newList = [...list];
		const allSize = Number(size);
		const allPage = Number(page);
		const index = (allPage - 1) * allSize;
		let lenth = allPage * allSize < list.length ? allSize + index : list.length;
		ctx.body = list.slice(index, lenth);
		return;
	}

	ctx.body = list;
});

router.post('/addName', async (ctx, next) => {
	let items = ctx.request.body;
	items.id = uuidv4();
	list = [...list, items];
	fs.writeFileSync(fileName, JSON.stringify(list, null, 2));
	ctx.body = list;
});

router.delete('/delName/:id', async (ctx, next) => {
	const id = ctx.params.id;
	list = list.filter((item) => {
		return item.id !== id;
	});
	fs.writeFileSync(fileName, JSON.stringify(list, null, 2));
	ctx.body = { message: 'success', list };
});

router.put('/name/:id', async (ctx, next) => {
	const id = ctx.params.id;
	let items = ctx.request.body;
	let index = list.findIndex((item) => item.id === id);

	if (index >= 0) {
		items.age = Number(items.age);
		list[index] = { ...list[index], ...items };
		fs.writeFileSync(fileName, JSON.stringify(list, null, 2));
		ctx.body = { message: 'success', list };
	} else {
		ctx.body = { message: 'error' };
	}
});

// 返回一个文件、设置response 、304

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// add router middleware:
app.use(router.routes());

app.listen(3000);

console.log(23456);
