const MongoClient = require("mongodb").MongoClient;
let uri =
  "";
let client = new MongoClient(uri);
client.connect((err) => {
  throw err;
});
let db = client.db("logs");

module.exports = db;
