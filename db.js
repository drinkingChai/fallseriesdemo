const Airtable = require('airtable');
const base = new Airtable({apiKey: 'key6qRBeIDctbUuyx'}).base('appg4IOu4UylFRYq7');

function getPageCb(num, cb) {
  base('CurriData').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record, id) {
      if (id == num) cb(null, {
        header: record.get('header'),
        imageUrl: record.get('imageUrl'),
        brief: record.get('brief') == undefined ? '' : record.get('brief').trim().split('- ').slice(1),
        full: record.get('full')
      })
    });
  }, function done(err) {
    if (err) { return cb(err) }
  });
}

function numPagesCb(cb) {
  base('CurriData').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    cb(null, records.length);
  }, function done(err) {
    if (err) { return cb(err) }
  });
}


module.exports = {
  getPageCb,
  numPagesCb
}
