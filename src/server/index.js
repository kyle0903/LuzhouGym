const mysql = require("mysql");
const express = require("express");
const currentPath = process.cwd();
require("dotenv").config({ path: currentPath + "/src/server/.env" });
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { HmacSHA256 } = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");
const axios = require("axios");
const app = express();
const PORT = 8081;
const {
  host,
  user,
  password,
  database,
  port,
  LINEPAY_CHANNEL_ID,
  LINEPAY_VERSION,
  LINEPAY_SITE,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_RETURN_HOST,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env;
const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
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
  const productPic = req.body.productPic;
  db.query(
    "INSERT INTO order_info(user_id,product_id,product_name,product_price,quantity,total,product_pic) VALUES(?,?,?,?,?,?,?)",
    [userId, productId, productName, price, productNum, total, productPic],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ status: "success" });
      }
    }
  );
});
//取得訂單資料
app.get("/api/order/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM order_info inner join member_info on order_info.user_id = member_info.id where order_info.user_id = ?;",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//發送linepay請求
var amounts = {};
app.get("/api/linepay/:id", (req, res) => {
  const id = req.params.id;
  let order = {};
  let newPackage = [];
  let total = 0;
  db.query(
    "SELECT * FROM order_info WHERE user_id=?",
    id,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < result.length; i++) {
          newPackage.push({
            id: result[i].cart_id.toString(),
            amount: result[i].total,
            products: [
              {
                name: result[i].product_name,
                quantity: result[i].quantity,
                price: result[i].product_price,
              },
            ],
          });
          total += result[i].total;
        }
        order = {
          amount: total,
          currency: "TWD",
          orderId: parseInt(new Date().getTime() / 1000),
          packages: newPackage,
          redirectUrls: {
            confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
            cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
          },
        };
        //為了linepay的confirm用，怕同時有不同orderid用全域變數會有誤
        amounts[order.orderId] = order.amount;
        //因為是async的關係，所以要加上try catch
        try {
          let linepayBody = order;
          const uri = "/payments/request";
          const headers = CreateSignature(linepayBody, uri);
          //linepay的api地址
          const linepay_url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
          //提交linepay request，需要用await確保提交後才做接下來的動作
          const linepayRes = await axios.post(linepay_url, linepayBody, {
            headers,
          });
          if (linepayRes.data.returnCode === "0000") {
            res.send({
              status: "success",
              urls: linepayRes.data.info.paymentUrl.web,
            });
          }
        } catch (error) {
          //錯誤的回饋ㄎ
          console.log(error);
        }
      }
    }
  );
});
//製作簽章資訊
function CreateSignature(linepayBody, uri) {
  const nonce = parseInt(new Date().getTime() / 1000);
  const linepay_str = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
    linepayBody
  )}${nonce}`;
  //將以上資訊加密成簽章
  const signature = Base64.stringify(
    HmacSHA256(linepay_str, LINEPAY_CHANNEL_SECRET_KEY)
  );
  //要確認訂單身份的資料
  const headers = {
    "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
    "Content-Type": "application/json",
    "X-LINE-Authorization-Nonce": nonce,
    "X-LINE-Authorization": signature,
  };
  return headers;
}
app.post("/api/linepay/confirm", async (req, res) => {
  const transactionId = req.body.transactionId;
  const orderId = req.body.orderId;
  console.log(transactionId, orderId);
  let orderid = orderId;
  try {
    const linepayBody = {
      amount: amounts[orderid],
      currency: "TWD",
    };
    console.log(linepayBody);
    const uri = `/payments/${transactionId}/confirm`;
    const headers = CreateSignature(linepayBody, uri);
    const linepay_url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linepayRes = await axios.post(linepay_url, linepayBody, {
      headers,
    });
    if (linepayRes.data.returnCode === "0000") {
      res.send({
        status: "success",
        message: "訂單已成功付款，三秒後將導向首頁",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
