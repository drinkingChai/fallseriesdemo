const Airtable = require('airtable');
const base = new Airtable({apiKey: 'key6qRBeIDctbUuyx'}).base('appg4IOu4UylFRYq7');

// helper
function parse(str) {
  var strArr = str.split('\n').map(function(s) {
    if (s[0] == '-') return { type: 'bullet', text: s.slice(2) }
    return { type: 'para', text: s }
  });
  return strArr;
}

function getPageCb(num, cb) {
  base('CurriData').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record, id) {
      if (id == num) cb(null, {
        header: record.get('header'),
        imageUrl: record.get('imageUrl'),
        brief: record.get('brief') == undefined ? '' : record.get('brief').trim().split('- ').slice(1),
        full: record.get('full') == undefined ? '' : parse(record.get('full'))
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
    cb(null, records);
  }, function done(err) {
    if (err) { return cb(err) }
  });
}

function getRidesCb(cb) {
  base('Rides').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    cb(null, records.map(function(record) {
      var fields = record.fields,
        date = fields.date.split('-');
      fields.date = `${date[1]}/${date[2]}/${date[0]}`;
      return record.fields;
    }));
  }, function done(err) {
    if (err) { return cb(err) }
  });
}


module.exports = {
  getPageCb,
  numPagesCb,
  getRidesCb
}
