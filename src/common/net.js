/*
 * @Description  : 端口
 * @Author       : huyanyan
 * @Date         : 2022-03-24 16:27:58
 */
const net = require("net");
// 检测端口是否被占用
const portIsOccupied = (port) => {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);
  let isOccupied = false;
  server.on("listening", () => {
    // 执行这块代码说明端口未被占用
    server.close(); // 关闭服务
    console.log("The port【" + port + "】 is available."); // 控制台输出信息
    isOccupied = false;
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      // 端口已经被使用
      console.log(
        "The port【" + port + "】 is occupied, please change other port."
      );
      isOccupied = true;
    }
  });
  return isOccupied;
};

exports.portIsOccupied = portIsOccupied;
