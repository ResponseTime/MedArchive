require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
let uri = process.env.MONGO_URI;
let client = new MongoClient(uri);
client.connect((err) => {
  throw err;
});
let db = client.db("MedArchive");

module.exports = db;
