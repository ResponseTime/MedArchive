const express = require("express");
const path = require("path");
const app = express();
const db = require("./server.js");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
app.get("/insert/:name/:reason", async (req, res) => {
  let cols = await db.listCollections().toArray();
  cols = cols.map((x) => x.name);
  console.log(cols);
  if (cols.includes("bane")) {
    await db
      .collection("bane")
      .insertOne({ name: req.params.name, reason: req.params.reason });
  } else {
    await db.createCollection("bane");
    await db
      .collection("bane")
      .insertOne({ name: req.params.name, reason: req.params.reason });
  }
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
