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

app.get("/MedArchive/login", (req, res) => {
  res.render("login", { error: "" });
});

app.get("/MedArchive/signup", (req, res) => {
  res.render("signup", { error: "" });
});
let authenticate_login = async (req) => {
  let user = req.body.username;
  let pass = req.body.password;
  let c = await db.collection("login");
  let coll = await c.find();
  for await (let col of coll) {
    if (col.username === user && col.password === pass) {
      return true;
    }
  }
  return false;
};
let authenticate_signup = async (req) => {
  let user = req.body.user;
  let pass = req.body.pass;
  let c = await db.collection("login");
  let coll = await c.find();
  for await (let col of coll) {
    if (col.username === user && col.Name == req.body.Name) {
      return true;
    }
  }
  return false;
};
app.post("/MedArchive/api/login", async (req, res) => {
  let com = await authenticate_login(req);
  if (com) {
    req.session.user = req.body.username;
    req.session.save();
    res.render("main", { name: req.session.user });
  } else {
    res.render("login", { error: "Invalid Login" });
  }
});
app.post("/MedArchive/api/signup", async (req, res) => {
  let com = await authenticate_signup(req);
  let c = await db.collection("login");
  if (com) {
    res.render("signup", { error: "user already exists or username taken" });
  } else {
    c.insertOne({
      Name: req.body.Name,
      Age: req.body.Age,
      Email: req.body.Email,
      username: req.body.user,
      password: req.body.pass,
    });
    res.send("Done");
  }
});
app.get("/MedArchive/logout", (req, res) => {
  req.session.destroy();
  res.send("Done");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
