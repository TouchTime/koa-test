const fs = require('fs');
const { readFile } = require('fs/promises');
const type = 'utf8';
const staticData = {
	home: 'index.html',
};

/**
 * 读取页面
 * @param {string} name 显示的页面名称
 */
const readHtmlFile = (name) => {
	// return new Promise((resolve, reject) => {
	// 	fs.readFile(staticData[name], type, (err, data) => {
	// 		if (err) {
	// 			reject(err);
	// 		} else {
	// 			resolve(data);
	// 		}
	// 	});
	// });
	return readFile(staticData[name], type);
};

exports.readHtmlFile = readHtmlFile;
