const express = require("express");
const fs = require("fs");

require("dotenv").config();
const x = process.env.PORT;
const port = parseInt(x);

const checkLogin = require("./middleware/checkLogin");

const users = require("./route/users");
const blogs = require("./route/blogs");

const app = express();

app.use(express.json());

const dir = "uploads";

fs.exists(dir, function (exists) {
  if (!exists) {
    fs.mkdirSync(dir);
  }
});

app.use("/users", users);
app.use("/blogs", blogs);

app.use("/image", checkLogin, express.static(__dirname + "/uploads"));

//default errorhandler---------------------------------------------------------delet end
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
