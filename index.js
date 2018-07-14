// Include BeastByte
const BeastClass = require("./lib/BeastByte.js");

// List all files in a directory in Node.js recursively in a synchronous fashion
const allFilesSync = (dir, fileList = []) => {
  var fs = require("fs");
  const path = require("path");
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { [file]: allFilesSync(filePath) }
        : file
    );
  });
  return fileList;
};

var list = allFilesSync("./files");

// Instantiate Beast:
for (let i = 0; i < list.length; i++) {
  let file = "./files" + list[i];
  let beast = new BeastClass(file);
  beast.load();
  beast.corrupt();
  beast.save();
  beast.setDate();
}
