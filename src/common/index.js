/*
 * @Description  : 公共类
 * @Author       : huyanyan
 * @Date         : 2022-03-23 09:28:43
 */
const fs = require("fs");
const path = require("path");
const fileName = path.resolve("./", "src/mock/database.json");
const type = "utf8";

class DataBase {
  constructor(list) {
    this.list = list;
  }
  /**
   * 读取数据
   */
  getData() {
    let list = JSON.parse(fs.readFileSync(fileName, type));
    return list;
  }

  /**
   * 写入数据
   * @param{array} list 数据
   */
  writeData(list) {
    fs.writeFileSync(fileName, JSON.stringify(list, null, 2));
  }

  /**
   * 读取文件流
   */
  readStreams() {
    let data = "";
    // 创建可读流
    let readerStream = fs.createReadStream(fileName);
    // 设置编码为 utf8。
    readerStream.setEncoding(type);

    // 处理流事件 --> data, end, and error
    readerStream.on("data", (chunk) => {
      data += chunk;
    });
    // 结束
    readerStream.on("end", () => {
      return data;
    });
    // 错误
    readerStream.on("error", (err) => {
      console.log(err.stack);
    });
  }
}

exports.DataBase = DataBase;
