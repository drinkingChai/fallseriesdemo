const pages = require('./pages').pages;

function getPage(num) {
  return pages[num];
}

function numPages() {
  return pages.length;
}

module.exports = {
  getPage,
  numPages
}
