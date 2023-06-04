const express = require("express");
const path = require("path");
const app = express();
const db = require("./server.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: true,
  })
);
const port = 5000;

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;
  let c = await db.collection("login");
  let coll = await c.find();
  for await (let col of coll) {
    if (col.username === user && col.password === pass) {
      req.session.user = user;
      req.session.save();
      res.render("main");
    } else {
      res.send("Invalid Login");
    }
  }
});
app.get("/signup", (req, res) => {
  res.render("signup", { error: "" });
});
app.post("/signup", async (req, res) => {
  let user = req.body.user;
  let pass = req.body.pass;
  let c = await db.collection("login");
  let coll = await c.find();
  for await (let col of coll) {
    if (col.username === user || col.Name === req.body.Name) {
      res.render("signup", { error: "user already exists or username taken" });
    } else {
      c.insertOne({
        Name: req.body.Name,
        Age: req.body.Age,
        Email: req.body.Email,
        username: user,
        password: pass,
      });
      res.send("Done");
    }
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
