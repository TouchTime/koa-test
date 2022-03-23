/*
 * @Description  : 文件流的读写
 * @Author       : huyanyan
 * @Date         : 2022-03-23 16:35:12
 */

const fs = require("fs");
const path = require("path");
const fileName = path.resolve("./", "src/mock/test.txt");
const type = "utf8";
const data = "文件流";

const readStreamFun = () => {
  // 创建可读流
  let readerStream = fs.createReadStream(fileName);
  // 设置编码为 utf8。
  readerStream.setEncoding(type);

  // 处理流事件 --> data, end, and error
  readerStream.on("data", (chunk) => {
    data += chunk;
  });

  readerStream.on("end", () => {
    console.log(data);
  });

  readerStream.on("error", (err) => {
    console.log(err.stack);
  });

  console.log("程序执行完毕");
};

const writeStreamFun = () => {
  // 创建一个可以写入的流，写入到文件 output.txt 中
  let writerStream = fs.createWriteStream(fileName);
  // 使用 utf8 编码写入数据
  writerStream.write(data, type);

  // 标记文件末尾
  writerStream.end();

  // 处理流事件 --> finish、error
  writerStream.on("finish", () => {
    console.log("写入完成。");
  });

  writerStream.on("error", (err) => {
    console.log(err.stack);
  });
};

readStreamFun();
writeStreamFun();
