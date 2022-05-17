const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const jwtKey = "~!@#$%^&*()+,";

app.use(express.json());

const database = {
  username: "username",
  password: "password",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === database.username && password === database.password) {
    jwt.sign(
      {
        username,
      },
      jwtKey,
      {
        expiresIn: "30S",
      },
      (_, token) => {
        res.json({
          username,
          message: "登陆成功",
          token,
        });
      }
    );
  }
});

app.get("/afterlogin", (req, res) => {
  const { headers } = req;
  const token = headers["authorization"].split(" ")[1];
  jwt.verify(token, jwtKey, (err, payload) => {
    if (err) res.sendStatus(403);
    res.json({ message: "认证成功", payload });
  });
});

app.listen(3000, () => {
  console.log(3000 + " listening...");
});
