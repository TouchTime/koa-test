/*
 * @Description  : 公共类
 * @Author       : huyanyan
 * @Date         : 2022-03-23 09:28:43
 */
const fs = require("fs");
const { rename } = require("fs/promises");
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
   * 修改文件名
   * @param {string} oldFileUrl 原路径名称
   * @param {string} newFileUrl 新路径名称
   */
  rename(oldFileUrl, newFileUrl) {
    return rename(oldFileUrl, newFileUrl);
  }
  /**
   * 读取文件流
   * @param {string} filePath 文件路径
   */
  readStreams(filePath) {
    let data = "";
    let readerStream = fs.createReadStream(filePath);

    // 设置编码为 utf8。
    readerStream.setEncoding(type);

    // 处理流事件 --> data, end, and error
    readerStream.once("data", (chunk) => {
      data += chunk;
    });
    // 结束
    readerStream.once("end", () => {
      return data;
    });
    // 错误
    readerStream.once("error", (err) => {
      console.log(err.stack);
    });

    return readerStream;
  }

  /**
   * 修改下载的文件流名称
   * @param {string} ctx 响应数据
   * @param {string} fileName 文件名称
   */
  setName(ctx, fileName) {
    // 设置下载文件流名称（兼容中文）
    const handleName = encodeURIComponent(fileName);
    // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
    ctx.set("Content-disposition", "attachment; filename=" + handleName);
  }
}

exports.DataBase = DataBase;
