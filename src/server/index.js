const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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
  let hashPassword = bcrypt.hashSync(pwd, 10);
  let rand = crypto.randomBytes(32).toString("hex");
  function sendmail(email, rand) {
    var htmls =
      "請點擊<a href='http://localhost:3000/login/" +
      rand +
      "'>這個連結</a>認證您的蘆洲健身房會員帳號";
    var mailer = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ha10966001@gmail.com", // Your email id
        pass: "oihehrzckskoegas", // Your password
      },
    });
    var mailOptions = {
      from: "ha10966001@gmail.com",
      to: email,
      subject: "蘆洲健身房會員之信箱認證",
      html: htmls,
    };

    mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(0);
      }
    });
  }
  db.query("SELECT user FROM member_info WHERE user=?", user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        db.query(
          "INSERT INTO member_info(user,password,email,create_date,vertify) VALUES(?,?,?,?,?)",
          [user, hashPassword, mail, currentTime, 0],
          (err, result1) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                "SELECT id FROM member_info WHERE user=?",
                user,
                (err, result2) => {
                  if (err) {
                    console.log(err);
                  } else {
                    //這邊可以select random_sign where user_id=id，原因是因為如果同個帳號已經有先寄過驗證碼，那就要刪除原本的再新增新的
                    db.query(
                      "INSERT INTO random_sign(user_id,randomCode) VALUES(?,?)",
                      [result2[0].id, rand],
                      (err, result2) => {
                        if (err) {
                          console.log(err);
                        } else {
                          sendmail(mail, rand);
                          res.send({
                            status: "success",
                            message: "已寄信至您的信箱，請前往認證會員帳號",
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        res.send("該帳號已有人使用，或正在申請中，請重新輸入！");
      }
    }
  });
});
//啟用會員資格
app.get("/api/signEnable/:validcode", (req, res) => {
  const validcode = req.params.validcode;
  db.query(
    "SELECT * FROM random_sign WHERE randomCode = ?",
    validcode,
    (err, result) => {
      console.log(result, result.length);
      if (err) {
        console.log(err);
      } else {
        if (result.length == 1) {
          db.query(
            "UPDATE member_info SET vertify=1 WHERE id=?",
            result[0].user_id,
            (err, result2) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "DELETE FROM random_sign WHERE user_id=?",
                  result[0].user_id,
                  (err, result3) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send({
                        state: "success",
                        message: "已啟用會員資格，請重新登入",
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send({
            state: "failed",
            message: "該連結已過期",
          });
        }
      }
    }
  );
});
//登入會員
app.post("/api/login", (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;
  db.query("SELECT * FROM member_info WHERE user=?", user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        console.log("1");
        res.send({
          state: "failed",
          message: "會員帳號並不存在，請先前往註冊",
        });
      } else {
        const psRes = bcrypt.compareSync(pwd, result[0].password);
        if (!psRes) {
          res.send({
            state: "failed",
            message: "您輸入的帳號或密碼有誤！",
          });
        } else {
          const payload = {
            id: result[0].id,
            user: result[0].user,
          };
          const token = jwt.sign(payload, "pluto", { expiresIn: "24h" }); // generate token based on username
          // return the token
          res.send({
            state: "success",
            message: "登入中...",
            token,
            id: result[0].id,
          });
        }
      }
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
