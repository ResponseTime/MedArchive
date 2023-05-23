const MongoClient = require("mongodb").MongoClient;
let uri =
  "mongodb+srv://aayushbhattacharjee2002:killswitch0507@cluster0.0hactfb.mongodb.net/?retryWrites=true&w=majority";
let client = new MongoClient(uri);
client.connect((err) => {
  throw err;
});
let db = client.db("logs");

module.exports = db;
