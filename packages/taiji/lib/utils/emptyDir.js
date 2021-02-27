const fs = require("fs-extra");
const path = require("path");

/**
 * 清空文件夹
 * 加入白名单
 * @param {*} dir
 * @param {*} whitelist
 * @param {*} callback
 */
module.exports = (dir, whitelist, callback) => {
  callback = callback || function () {};
  if (typeof whitelist === "function") {
    callback = whitelist;
    whitelist = undefined;
  }
  fs.readdir(dir, (err, items) => {
    if (err) return fs.mkdirs(dir, callback);
    const newItems = items.reduce((arr, item) => {
      if (whitelist && whitelist.includes(item)) {
      } else {
        arr.push(path.join(dir, item));
      }
      return arr;
    }, []);
    function deleteItem() {
      const item = newItems.pop();
      if (!item) return callback();
      fs.remove(item, (err) => {
        if (err) return callback(err);
        deleteItem();
      });
    }
    deleteItem();
  });
};
