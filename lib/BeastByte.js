var fs = require("fs");
class BeastByte {
  constructor(path) {
    this.path = path;

    this.stats = this.getStats(path);
    this.ctime = this.getCTime(this.stats);
    this.mtime = this.getMTime(this.stats);
  }

  load() {
    this.file = this.fileLoad(this.path);
  }
  save() {
    this.fileSave(this.path);
  }
  setDate() {
    this.changeDate(this.path);
  }

  fileLoad(path) {
    return fs.readFileSync(path);
  }

  fileSave(path) {
    fs.writeFileSync(path, this.file);
  }
  changeDate(path) {
    fs.utimesSync(path, this.ctime, this.mtime);
  }
  getStats(path) {
    return fs.statSync(path);
  }
  getCTime(stats) {
    return stats.ctime;
  }
  getMTime(stats) {
    return stats.mtime;
  }
  randomSort(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  corrupt() {
    this.file = this.randomSort(this.file);
  }
}

module.exports = BeastByte;
