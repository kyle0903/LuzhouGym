const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const app = express();
const PORT = 8081;
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "junkai0903",
  database: "luzhougym",
  port: 3306,
});
app.use(cors());
app.use(express.json());
//註冊會員
app.post("/api/sign", (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;
  const mail = req.body.mail;
  const currentTime = req.body.currentTime;
  let hashPassword = crypto.createHash("sha1");
  hashPassword.update(pwd);
  const rePassword = hashPassword.digest("hex");
  db.query("SELECT user FROM member_info WHERE user=?", user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        db.query(
          "INSERT INTO member_info(user,password,email,create_date) VALUES(?,?,?,?)",
          [user, rePassword, mail, currentTime],
          (err, result1) => {
            if (err) {
              console.log(err);
              res.send({
                status: "failed",
                message: "註冊過程中可能出了一點問題...",
              });
            } else {
              console.log(result1);
              res.send({ status: "success", message: "恭喜你成功註冊！" });
            }
          }
        );
      } else {
        res.send("該帳號已有人使用，請重新申請！");
      }
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
