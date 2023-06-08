const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
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
                    res.send({
                      status: "failed",
                      message: "註冊過程中發現問題...",
                    });
                    console.log(err);
                  } else {
                    //這邊可以select random_sign where user_id=id，原因是因為如果同個帳號已經有先寄過驗證碼，那就要刪除原本的再新增新的
                    db.query(
                      "INSERT INTO random_sign(user_id,randomCode) VALUES(?,?)",
                      [result2[0].id, rand],
                      (err, result2) => {
                        if (err) {
                          res.send({
                            status: "failed",
                            message: "註冊過程中發現問題...",
                          });
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
                        status: "success",
                        message: "已啟用會員資格，請重新登入",
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          console.log("???");
          res.send({
            status: "failed",
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
          status: "failed",
          message: "會員帳號並不存在，請先前往註冊",
        });
      } else {
        const psRes = bcrypt.compareSync(pwd, result[0].password);
        if (!psRes || result[0].vertify === 0) {
          res.send({
            status: "failed",
            message: "您輸入的帳號或密碼有誤，或是帳號還未經過認證",
          });
        } else {
          const payload = {
            id: result[0].id,
            user: result[0].user,
          };
          const token = jwt.sign(payload, "pluto", { expiresIn: "24h" }); // generate token based on username
          // return the token
          res.send({
            status: "success",
            message: "登入中...",
            token,
            id: result[0].id,
          });
        }
      }
    }
  });
});
//驗證token
app.post("/api/token", (req, res) => {
  token = req.body.token;

  jwt.verify(token, "pluto", function (err, decoded) {
    if (err) {
      res.send(false); // 失敗時回傳 Unauthorized 錯誤訊息
    } else {
      res.send(decoded); // 將解密後token回傳
    }
  });
});
//上傳檔案至本地端
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/image"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
app.post("/api/upload/:id", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const id = req.params.id;
  db.query(
    "UPDATE member_basic_info SET image=? WHERE user_id=?",
    [image, id],
    (err, result) => {
      if (err) {
        res.send({ status: "failed", message: "上傳失敗" });
      } else {
        res.send({ status: "success", message: "上傳成功" });
      }
    }
  );
});
//取得會員檔案
app.get("/api/basicmember/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM member_basic_info WHERE user_id=?",
    id,
    (err, result) => {
      if (err) {
        res.send({ status: "failed", message: "取得會員檔案失敗" });
      } else {
        res.send({ status: "success", result: result });
      }
    }
  );
});
//更新會員檔案
app.post("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const gender = req.body.gender;
  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  db.query(
    "UPDATE member_basic_info SET age=?, gender=?, height=?, weight=? WHERE user_id=?",
    [age, gender, height, weight, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send({ status: "success", message: "儲存完成" });
      }
    }
  );
});
//更改密碼
app.post("/api/changepwd", (req, res) => {
  const id = req.body.id;
  console.log(id);
  const oldPwd = req.body.oldPwd;
  const newPwd = req.body.newPwd;
  db.query("SELECT * FROM member_info WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const psRes = bcrypt.compareSync(oldPwd, result[0].password);
      if (!psRes) {
        res.send({ status: "failed", message: "舊密碼輸入錯誤" });
      } else {
        let hashPassword = bcrypt.hashSync(newPwd, 10);
        db.query(
          "UPDATE member_info SET password=? WHERE id=?",
          [hashPassword, id],
          (err, result2) => {
            if (err) {
              console.log(err);
              res.send({
                status: "failed",
                message: "更改密碼過程中出了點問題",
              });
            } else {
              res.send({
                status: "success",
                message: "密碼更改完成，請重新登入，3秒後將登出...",
              });
            }
          }
        );
      }
    }
  });
});
//取得產品資料
app.get("/api/product", (req, res) => {
  db.query("SELECT * FROM product_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//加入到購物車
app.post("/api/addcart", (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const productName = req.body.productName;
  const price = req.body.price;
  const productNum = req.body.productNum;
  const total = price * productNum;
  db.query(
    "INSERT INTO order_info(user_id,product_id,product_name,product_price,quantity,total) VALUES(?,?,?,?,?,?)",
    [userId, productId, productName, price, productNum, total],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});
//取得訂單資料
app.get("/api/order/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM order_info WHERE user_id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
