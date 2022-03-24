/*
 * @Description  : 文件内容读写
 * @Author       : huyanyan
 * @Date         : 2022-03-23 09:21:28
 */
const fs = require("fs");

// 同步写入方法 writeFileSync
// fs.writeFileSync('2', 'hellos world');
// let data = fs.readFileSync('2', 'utf8');

// console.log(data);

// 异步写入方法writeFile
const fileName = "1212datbase.json";
let list = [
  {
    name: "zhangsan",
    id: "1",
    age: 12,
  },
  {
    name: "lisi",
    id: "2",
    age: 14,
  },
  {
    name: "wangwu",
    id: "3",
    age: 17,
  },
];
// const replacer = (key, value) => {
// 	console.log(key);
// 	return typeof value === 'string' ? value : undefined;
// };
// let arr = JSON.stringify(list, replacer, 2);
// console.log(arr);
const type = "utf8";
// JSON.stringify(value[, replacer [, space]])
fs.writeFile(fileName, JSON.stringify({ list }, null, 2), (err) => {
  if (!err) {
    fs.readFile(fileName, type, (err, data) => {
      console.log(data);
    });
  }
});
// fs.unlink(fileName, (err) => {
// 	console.log(err, 1222);
// });

// 增删改查 查：readFileSync、readFile    增：writeFileSync、writeFile 、追加写入appendFile、appendFileSync 文件拷贝copyFileSync、copyFile
// 删：unlink rmSync rm
