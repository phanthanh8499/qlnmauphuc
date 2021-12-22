var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { Pool, Client } = require("pg");
var cors = require("cors");
const fileUpload = require("express-fileupload");
var fs = require("fs");

router.use(fileUpload());
router.use(express.static("files"));
router.use(cors());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qlnmauphuc",
  password: "admin",
  port: 5432,
});

const nodemailer = require("nodemailer");
router.get("/", function (req, res, next) {});
router.get("/send-mail", function (req, res) {
  //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
  var transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "phanthanh8499@gmail.com", //Tài khoản gmail vừa tạo
      pass: "121311Aa", //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  var content = "";
  content += `
         <div style="margin-bottom: 10px">
            <p stlye="margin: 0px">Chào Thành,</p>
            <p stlye="margin: 0px">
              Đơn hàng bbedfec0-f376-4ff6-9b5c-083cefef2334 của bạn đã được
              duyệt, bạn có thể tiến hành theo dõi đơn hàng <a href="http://localhost:3000/account/orders" target="_blank">
                ở đây
              </a>
              .
            </p>
            <p stlye="margin: 0px">Trân trọng </p>
            <p stlye="margin: 0px">Nhà may âu phục Thành Phan </p>
          </div>
          <div
            style="
              font-size: 14px;
              border-top: 1px dashed black;
              padding-top: 10px;
              font-style: italic
            "
          >
            <p style="font-weight: 600; margin: 0px">Nhà may âu phục Thành Phan</p>
            <p style="margin: 0px">Địa chỉ: 999/9, Nguyễn Văn Linh, Ninh Kiều, Cần Thơ</p>
            <p style="margin: 0px">Email: thanhphan8499@gmail.com</p>
            <p style="margin: 0px">Hotline: (+84)91 551 80 13</p>
          </div>
    `;
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "NQH-Test nodemailer",
    to: "devilmaycry5554@gmail.com",
    subject: "Test Nodemailer",
    text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: content, //Nội dung html mình đã tạo trên kia :))
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      // req.flash("mess", "Lỗi gửi mail: " + err); //Gửi thông báo đến người dùng
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      // req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
      res.redirect("/");
    }
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {});

// api get data from postgresql
router.post("/signin", function (req, res, next) {
  // get data
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  pool.query(
    `SELECT users.*, ut_name FROM users 
INNER JOIN user_types on users.user_typeid = user_types.id
WHERE user_isdeleted = 'false' AND (user_username = '${username}' OR user_tel = '${username}')`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        console.log(response.rows.length);
        if (response.rows.length === 0) {
          res.send("ERROR");
        } else {
          var check = bcrypt.compareSync(
            password,
            response.rows[0].user_password
          );
          if (!check) {
            res.send("ERROR");
            return false;
          } else {
            const token = jwt.sign({ username, password }, "MYSECRET", {
              expiresIn: "3d",
            });
            res.send({
              id: response.rows[0].id,
              user_username: response.rows[0].user_username,
              user_address: response.rows[0].user_address,
              user_tel: response.rows[0].user_tel,
              user_firstname: response.rows[0].user_firstname,
              user_lastname: response.rows[0].user_lastname,
              user_status: response.rows[0].user_status,
              user_typeid: response.rows[0].user_typeid,
              user_date: response.rows[0].user_date,
              user_avatar: response.rows[0].user_avatar,
              user_email: response.rows[0].user_email,
              user_wardid: response.rows[0].user_wardid,
              ut_name: response.rows[0].ut_name,
              // Copy het tat ca cac phan tu trong mang
              token,
            });
          }
        }
      }
    }
  );
});

router.post("/changePassword", async function (req, res, next) {
  // get data
  const { currentpass, newpass, id } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(newpass, salt);
  var newpassword = hashPass;
  console.log(currentpass, newpass, id);
  pool.query(
    `SELECT user_password FROM users WHERE id = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        console.log(response.rows.length);
        console.log(response.rows);
        if (response.rows.length === 0) {
          res.send("ERROR");
        } else {
          var check = bcrypt.compareSync(
            currentpass,
            response.rows[0].user_password
          );
          if (!check) {
            res.send("ERROR");
            console.log("mk khong hop le");
            return false;
          } else {
            pool.query(
              `UPDATE users SET user_password = '${newpassword}' WHERE id = '${id}'`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  res.send("OK");
                }
              }
            );
          }
        }
      }
    }
  );
});

router.post("/signup", async function (req, res, next) {
  var username = req.body.username,
    password = req.body.password,
    tel = req.body.tel;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  var newpassword = hashPass;
  if (!username || !password) {
    console.log("Thieu thong tin");
  } else {
    pool.query(
      `INSERT INTO users (user_username, user_password, user_typeid, user_status, user_date, user_avatar, user_tel, user_isdeleted) 
      VALUES ($1, $2, 'KH', 'active', NOW()::TIMESTAMP, './images/avatar/user-image.jpg', $3, 'false') RETURNING id`,
      [username, newpassword, tel],
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Đã insert thành công! user: " + username);
          console.log(response);
          console.log(response.rows);
        }
      }
    );
  }
});

router.get("/getUserData", function (req, res) {
  pool.query(
    `SELECT id, user_username, user_tel, user_status, user_isdeleted FROM users`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get("/admin/users", function (req, res) {
  pool.query(
    `SELECT users.*, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
INNER JOIN ward ON ward.id = users.user_wardid
INNER JOIN district ON district.id = ward.ward_districtid
INNER JOIN province ON province.id = ward.ward_provinceid`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});
router.get("/admin/users/getCustomer", function (req, res) {
  pool.query(
    `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.user_typeid = 'KH' AND user_isdeleted = 'false'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get("/admin/users/getStaff", function (req, res) {
  pool.query(
    `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
LEFT JOIN user_permissions ON user_permissions.up_userid = users.id
WHERE users.user_typeid != 'KH' AND user_isdeleted = 'false'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/users/delete", function (req, res) {
  const { id, log_date, log_userid, log_eventtypeid, user_username } = req.body;
  pool.query(
    `UPDATE users
	SET user_isdeleted='true'
	WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(id);
        pool.query(
          `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Xoá tài khoản ${user_username} (ID: ${id})');`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Ghi nhật ký thành công!");
            }
          }
        );
      }
    }
  );
});

router.get("/getProductTypeData", function (req, res) {
  pool.query(`SELECT * FROM producttypes`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.get("/getClothTypeData", function (req, res) {
  pool.query(`SELECT * FROM clothtypes`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.get("/getProductData", function (req, res) {
  pool.query(
    `SELECT * FROM products WHERE product_isdeleted = 'false'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get("/getProductCategoryData.:id", function (req, res) {
  const { id } = req.params;
  console.log(id);
  let temp = "";
  if (id === "ALL") {
    pool.query(
      `SELECT * FROM products WHERE product_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  } else if (id === "FFM") {
    temp = `product_typeid = 'BFM' OR product_typeid = 'GFM' OR product_typeid = 'SFM'`;
    pool.query(
      `SELECT * FROM products WHERE ${temp} AND product_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  } else if (id === "FFF") {
    temp = `product_typeid = 'VFF' OR product_typeid = 'GFF' OR product_typeid = 'SFF'`;
    pool.query(
      `SELECT * FROM products WHERE ${temp} AND product_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  } else {
    pool.query(
      `SELECT * FROM products WHERE product_typeid = '${id}' AND product_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
});

router.post("/admin/products/add", function (req, res) {
  const {
    product_code,
    product_name,
    product_typeid,
    product_color,
    product_price,
    product_material,
    product_lining,
    product_thickness,
    product_softness,
    product_elasticity,
    product_size,
    product_introduction1,
    product_introduction2,
    product_introduction3,
    product_introduction4,
    product_introduction5,
    frontEndURL,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  const file1 = req.files.file1;
  const filename1 = file1.name;
  const file2 = req.files.file2;
  const filename2 = file2.name;
  const file3 = req.files.file3;
  const filename3 = file3.name;
  const file4 = req.files.file4;
  const filename4 = file4.name;
  var newpath = "";
  var admpath = "";
  var product_image1 = "./images";
  var product_image2 = "./images";
  var product_image3 = "./images";
  var product_image4 = "./images";
  newpath =
    frontEndURL + "/images/" + product_typeid + "/" + product_code + "/";

  product_image1 =
    product_image1 +
    "/" +
    product_typeid +
    "/" +
    product_code +
    "/" +
    filename1;
  product_image2 =
    product_image2 +
    "/" +
    product_typeid +
    "/" +
    product_code +
    "/" +
    filename2;
  product_image3 =
    product_image3 +
    "/" +
    product_typeid +
    "/" +
    product_code +
    "/" +
    filename3;
  product_image4 =
    product_image4 +
    "/" +
    product_typeid +
    "/" +
    product_code +
    "/" +
    filename4;

  console.log(newpath);
  console.log(admpath);
  console.log(product_image1, product_image2, product_image3, product_image4);
  console.log(
    product_code,
    product_name,
    product_typeid,
    product_color,
    product_price,
    product_material,
    product_lining,
    product_thickness,
    product_softness,
    product_elasticity,
    product_size,
    product_introduction1,
    product_introduction2,
    product_introduction3,
    product_introduction4,
    product_introduction5,
    frontEndURL
  );
  pool.query(
    `INSERT INTO products(
	product_code, product_typeid, product_name, product_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3, product_isdeleted)
	VALUES ('${product_code}', '${product_typeid}', '${product_name}', '${product_price}', '${product_color}', '${product_material}', '${product_lining}', '${product_size}', '${product_thickness}', '${product_softness}', '${product_elasticity}', '${product_introduction1}', '${product_introduction2}', '${product_introduction3}', '${product_introduction4}', '${product_introduction5}', '${product_image4}', '${product_image1}', '${product_image2}', '${product_image3}', 'false') RETURNING id`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        if (!fs.existsSync(newpath)) {
          fs.mkdirSync(newpath);
        }

        file1.mv(`${newpath}${filename1}`, (err) => {
          if (err) {
            console.log(err);
          }
        });

        file2.mv(`${newpath}${filename2}`, (err) => {
          if (err) {
            console.log(err);
          }
        });

        file3.mv(`${newpath}${filename3}`, (err) => {
          if (err) {
            console.log(err);
          }
        });

        file4.mv(`${newpath}${filename4}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        pool.query(
          `SELECT * FROM products WHERE id = '${response.rows[0].id}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              res.send(response.rows[0]);
              pool.query(
                `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}', '${log_date}', 'Thêm mới sản phẩm có mã ${response.rows[0].product_code}');`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.get("/getDetailProduct.:id", function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT products.*, producttypes.pt_name FROM products 
INNER JOIN producttypes ON producttypes.id = products.product_typeid 
WHERE products.id = ${id}`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/products/edit", function (req, res) {
  const {
    id,
    product_code,
    product_name,
    product_color,
    product_typeid,
    product_price,
    product_material,
    product_lining,
    product_thickness,
    product_softness,
    product_elasticity,
    product_size,
    product_introduction1,
    product_introduction2,
    product_introduction3,
    product_introduction4,
    product_introduction5,
    product_old_name,
    product_old_color,
    product_old_typeid,
    product_old_price,
    product_old_material,
    product_old_lining,
    product_old_thickness,
    product_old_softness,
    product_old_elasticity,
    product_old_size,
    product_old_introduction1,
    product_old_introduction2,
    product_old_introduction3,
    product_old_introduction4,
    product_old_introduction5,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  pool.query(
    `UPDATE products SET product_typeid='${product_typeid}', product_name='${product_name}', product_price='${product_price}', product_color='${product_color}', product_material='${product_material}', product_lining='${product_lining}', product_size='${product_size}', product_thickness='${product_thickness}', product_softness='${product_softness}', product_elasticity='${product_elasticity}', product_introduction1='${product_introduction1}', product_introduction2='${product_introduction2}', product_introduction3='${product_introduction3}', product_introduction4='${product_introduction4}', product_introduction5='${product_introduction5}' WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        pool.query(
          `SELECT * FROM products WHERE id='${id}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              res.send(response.rows[0]);
            }
          }
        );
        pool.query(
          `INSERT INTO log(
            log_userid, log_eventtypeid, log_date, log_description)
            VALUES ('${log_userid}', '${log_eventtypeid}', '${log_date}', 'Chỉnh sửa thông tin sản phẩm ${product_code}') RETURNING id`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              pool.query(
                `INSERT INTO product_log_detail(
	pld_logid, pld_old_typeid, pld_new_typeid, pld_old_name, pld_new_name, pld_old_price, pld_new_price, pld_old_color, pld_new_color, pld_old_material, pld_new_material, pld_old_lining, pld_new_lining, pld_old_size, pld_new_size, pld_old_thickness, pld_new_thickness, pld_old_softness, pld_new_softness, pld_old_elasticity, pld_new_elasticity, pld_old_introduction1, pld_new_introduction1, pld_old_introduction2, pld_new_introduction2, pld_old_introduction3, pld_new_introduction3, pld_old_introduction4, pld_new_introduction4, pld_old_introduction5, pld_new_introduction5)
	VALUES ('${response.rows[0].id}', '${product_old_typeid}', '${product_typeid}', '${product_old_name}', '${product_name}', '${product_old_price}', '${product_price}', '${product_old_color}', '${product_color}', '${product_old_material}', '${product_material}', '${product_old_lining}', '${product_lining}', '${product_old_size}', '${product_size}', '${product_old_thickness}', '${product_thickness}', '${product_old_softness}', '${product_softness}', '${product_old_elasticity}', '${product_elasticity}', '${product_old_introduction1}', '${product_introduction1}', '${product_old_introduction2}', '${product_introduction2}', '${product_old_introduction3}', '${product_introduction3}', '${product_old_introduction4}', '${product_introduction4}', '${product_old_introduction5}', '${product_introduction5}')`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!!!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/admin/products/delete", function (req, res) {
  const { id, log_date, log_userid, log_eventtypeid } = req.body;
  console.log(id, log_date, log_userid, log_eventtypeid);
  pool.query(
    `UPDATE products SET product_isdeleted = 'true' WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(id);
        pool.query(
          `SELECT product_code FROM products WHERE id='${id}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              pool.query(
                `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Xoá sản phẩm ${response.rows[0].product_code}');`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/getClothData", function (req, res) {
  const { cloth_material } = req.body;
  if (cloth_material) {
    pool.query(
      `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name, user_username, user_firstname, user_lastname
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
INNER JOIN users ON users.id = cloth.cloth_userid
WHERE cloth.cloth_material = '${cloth_material}' AND cloth.cloth_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  } else {
    pool.query(
      `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name, user_username, user_firstname, user_lastname
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
INNER JOIN users ON users.id = cloth.cloth_userid 
WHERE cloth.cloth_isdeleted = 'false'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
});

router.post("/getMyClothData", function (req, res) {
  const { cloth_userid } = req.body;
  pool.query(
    `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
WHERE cloth.cloth_userid = '${cloth_userid}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/cloth/add", function (req, res) {
  const {
    id,
    cloth_material,
    cloth_name,
    cloth_quantity,
    cloth_userid,
    cloth_typeid,
    ct_name,
    user_username,
    frontEndURL,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  const file = req.files.file;

  var newpath = "";
  var cloth_image = "./images";
  let date_ob = new Date().toISOString().split("T")[0];
  const filename = date_ob + "-" + file.name;
  if (cloth_typeid === "VCKH") {
    newpath =
      frontEndURL +
      "/images/Cloth/" +
      cloth_typeid +
      "/" +
      "User" +
      cloth_userid +
      "/";
    cloth_image =
      cloth_image +
      "/Cloth/" +
      cloth_typeid +
      "/" +
      "User" +
      cloth_userid +
      "/" +
      filename;
  } else {
    newpath = frontEndURL + "/images/Cloth/" + cloth_typeid + "/";
    cloth_image = cloth_image + "/Cloth/" + cloth_typeid + "/" + filename;
  }

  pool.query(
    `INSERT INTO cloth(
	id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image, cloth_isdeleted)
	VALUES ('${id}', '${cloth_material}', '${cloth_name}', '${cloth_quantity}', '${cloth_userid}', '${cloth_typeid}', '${cloth_image}', 'false');`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send({
          id: parseInt(id),
          cloth_material: cloth_material,
          cloth_name: cloth_name,
          cloth_quantity: cloth_quantity,
          cloth_userid: cloth_userid,
          cloth_typeid: cloth_typeid,
          cloth_image: cloth_image,
          user_username: user_username,
          ct_name: ct_name,
        });
        if (!fs.existsSync(newpath)) {
          fs.mkdirSync(newpath);
        }
        file.mv(`${newpath}${filename}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        pool.query(
          `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}', '${log_date}', 'Thêm mới ${cloth_name} (ID: ${id} - ${cloth_material})');`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Ghi nhật ký thành công!");
            }
          }
        );
      }
    }
  );
});

router.get("/getDetailCloth.:id", function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT cloth.*, user_username, user_firstname, user_lastname, ct_name FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
INNER JOIN users ON users.id = cloth.cloth_userid WHERE cloth.id = ${id}`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/cloth/edit", function (req, res) {
  const {
    id,
    cloth_material,
    cloth_old_name,
    cloth_name,
    cloth_old_quantity,
    cloth_quantity,
    cloth_userid,
    cloth_old_typeid,
    cloth_typeid,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  console.log(
    id,
    cloth_material,
    cloth_old_name,
    cloth_name,
    cloth_old_quantity,
    cloth_quantity,
    cloth_userid,
    cloth_old_typeid,
    cloth_typeid,
    log_date,
    log_userid,
    log_eventtypeid
  );
  pool.query(
    `UPDATE cloth
	SET cloth_name='${cloth_name}', cloth_quantity='${cloth_quantity}', cloth_typeid='${cloth_typeid}'
	WHERE id = '${id}' AND cloth_material = '${cloth_material}';`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        pool.query(
          `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name, user_username, user_firstname, user_lastname
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
INNER JOIN users ON users.id = cloth.cloth_userid
WHERE cloth.id='${id}' AND cloth_material = '${cloth_material}' AND cloth.cloth_isdeleted = 'false'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              res.send(response.rows[0]);
            }
          }
        );
        pool.query(
          `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Chỉnh sửa thông tin ${cloth_name} (ID: ${id} - ${cloth_material})' ) RETURNING id;`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              pool.query(
                `INSERT INTO cloth_log_detail(
	cld_logid, cld_old_name, cld_new_name, cld_old_quantity, cld_name_quantity, cld_old_typeid, cld_new_typeid)
	VALUES ('${response.rows[0].id}', '${cloth_old_name}', '${cloth_name}', '${cloth_old_quantity}', '${cloth_quantity}', '${cloth_old_typeid}', '${cloth_typeid}');`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/admin/cloth/delete", function (req, res) {
  const { id, log_date, log_userid, log_eventtypeid } = req.body;
  console.log(id, log_date, log_userid, log_eventtypeid);
  pool.query(
    `UPDATE cloth SET cloth_isdeleted = 'true' WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(id);
        pool.query(
          `SELECT * FROM cloth WHERE id='${id}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              pool.query(
                `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Xoá ${response.rows[0].cloth_name} (ID: ${response.rows[0].id} - ${response.rows[0].cloth_material})');`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.get("/getMeasurementsData.:id", function (req, res) {
  const { id } = req.params;
  if (parseInt(id) === 0) {
    pool.query(`SELECT * FROM measurements`, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    });
  } else {
    pool.query(
      `SELECT * FROM measurements WHERE m_userid = '${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
});

router.post("/admin/measurements/add", function (req, res) {
  // console.log("???");
  const {
    m_userid,
    m_neckline,
    m_bust,
    m_waist,
    m_buttock,
    m_shoulderwidth,
    m_armpitcircumference,
    m_biceps,
    m_wristaround,
    m_sleevelength,
    m_shirtlength,
    m_crotchlength,
    m_thighcircumference,
    m_dresslength,
    m_pantslength,
    m_gender,
  } = req.body;
  console.log(
    m_userid,
    m_neckline,
    m_bust,
    m_waist,
    m_buttock,
    m_shoulderwidth,
    m_armpitcircumference,
    m_biceps,
    m_wristaround,
    m_sleevelength,
    m_shirtlength,
    m_crotchlength,
    m_thighcircumference,
    m_dresslength,
    m_pantslength,
    m_gender
  );
  pool.query(
    `INSERT INTO measurements(
	m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender)
	VALUES ('${m_userid}', '${m_neckline}', '${m_bust}', '${m_waist}', '${m_buttock}', '${m_shoulderwidth}', '${m_armpitcircumference}', '${m_biceps}', '${m_wristaround}', '${m_sleevelength}', '${m_shirtlength}', '${m_crotchlength}', '${m_thighcircumference}', '${m_dresslength}', '${m_pantslength}', '${m_gender}');`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send({ msg: "ERROR" });
      } else {
        console.log("OK");
        res.send({ msg: "OK" });
      }
    }
  );
});

router.get("/getDetailMeasurements.:id", function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM measurements WHERE id = ${id}`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send({ msg: "ERROR" });
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/measurements/edit", function (req, res) {
  const {
    id,
    m_userid,
    m_neckline,
    m_bust,
    m_waist,
    m_buttock,
    m_shoulderwidth,
    m_armpitcircumference,
    m_biceps,
    m_wristaround,
    m_sleevelength,
    m_shirtlength,
    m_crotchlength,
    m_thighcircumference,
    m_dresslength,
    m_pantslength,
    m_gender,
  } = req.body;
  pool.query(
    `UPDATE measurements
	SET m_userid='${m_userid}', m_neckline='${m_neckline}', m_bust='${m_bust}', m_waist='${m_waist}', m_buttock='${m_buttock}', m_shoulderwidth='${m_shoulderwidth}', m_armpitcircumference='${m_armpitcircumference}', m_biceps='${m_biceps}', m_wristaround='${m_wristaround}', m_sleevelength='${m_sleevelength}', m_shirtlength='${m_shirtlength}', m_crotchlength='${m_crotchlength}', m_thighcircumference='${m_thighcircumference}', m_dresslength='${m_dresslength}', m_pantslength='${m_pantslength}', m_gender='${m_gender}'
	WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send({ msg: "ERROR" });
      } else {
        console.log("OK");
        res.send({ msg: "OK" });
      }
    }
  );
});

router.get("/admin/measurements/delete.:id", function (req, res) {
  const { id } = req.params;
  console.log(id);
  // pool.query(`DELETE FROM measurements WHERE id='${id}'`, (error, response) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Xoá thành công sản phẩm có id là: ", id);
  //   }
  // });
});

router.get("/getDetailUser.:id", function (req, res) {
  const { id } = req.params;
  pool.query(`SELECT * FROM users WHERE id='${id}'`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.post("/admin/users/changeStatus", function (req, res) {
  const { id, status, log_date, log_userid, log_eventtypeid, user_username } =
    req.body;
  console.log(id, status, log_date, log_userid, log_eventtypeid, user_username);
  pool.query(
    `UPDATE users
	SET user_status='${status}'
	WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        res.send({ id: id, status: status });
        if (status === "block") {
          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Khoá tài khoản ${user_username} (ID: ${id})');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        } else {
          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Mở khoá tài khoản ${user_username} (ID: ${id})');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        }
      }
    }
  );
});

router.post("/admin/users/add", async function (req, res) {
  const {
    user_firstname,
    user_password,
    user_lastname,
    user_address,
    user_username,
    user_email,
    user_tel,
    user_status,
    user_date,
    user_typeid,
    user_avatar,
    user_wardid,
    user_isdeleted,
    fileRecv,
    FRONTEND_URL,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(user_password, salt);
  var newpassword = hashPass;
  console.log(
    user_firstname,
    user_password,
    user_lastname,
    user_address,
    user_username,
    user_email,
    user_tel,
    user_status,
    user_date,
    user_typeid,
    user_avatar,
    user_wardid,
    user_isdeleted,
    fileRecv,
    FRONTEND_URL,
    newpassword
  );
  var id = 0;
  if (parseInt(fileRecv) === 1) {
    pool.query(
      `INSERT INTO users(
	user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_tel, user_status, user_date, user_email, user_wardid, user_isdeleted)
	VALUES ('${user_typeid}', '${user_username}', '${newpassword}', '${user_firstname}', '${user_lastname}', '${user_address}', '${user_tel}', '${user_status}', '${user_date}', '${user_email}', '${user_wardid}', '${user_isdeleted}') RETURNING id`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          id = response.rows[0].id;
          const file = req.files.file;
          const filename = Date.now() + "-" + id + "-" + file.name;
          var newpath = "";
          var image_path = "./images";
          newpath = FRONTEND_URL + "/images/avatar/User" + id + "/";
          image_path = image_path + "/avatar/User" + id + "/" + filename;
          console.log("co file");
          console.log(newpath, image_path);
          pool.query(
            `UPDATE users
	SET user_avatar='${image_path}'
	WHERE id='${id}'`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Da update file");
              }
            }
          );
          if (!fs.existsSync(newpath)) {
            fs.mkdirSync(newpath);
          }
          file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          if (user_typeid === "NV") {
            pool.query(
              `INSERT INTO user_permissions(
   up_userid, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting)
	VALUES ('${id}', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'false', 'false', 'false', 'false')`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  pool.query(
                    `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
LEFT JOIN user_permissions ON user_permissions.up_userid = users.id
WHERE users.id = '${id}'`,
                    (error, response) => {
                      if (error) {
                        console.log(error);
                      } else {
                        res.send(response.rows[0]);
                      }
                    }
                  );
                }
              }
            );
          } else {
            pool.query(
              `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.id = '${id}'`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  res.send(response.rows[0]);
                }
              }
            );
          }
          
          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Thêm mới tài khoản ${user_username} (ID: ${id})');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        }
      }
    );
  } else {
    pool.query(
      `INSERT INTO users(
	user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_tel, user_status, user_date, user_avatar, user_email, user_wardid, user_isdeleted)
	VALUES ('${user_typeid}', '${user_username}', '${newpassword}', '${user_firstname}', '${user_lastname}', '${user_address}', '${user_tel}', '${user_status}', '${user_date}', '${user_avatar}', '${user_email}', '${user_wardid}', '${user_isdeleted}') RETURNING id`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          id = response.rows[0].id;
          if (user_typeid === "NV") {
            pool.query(
              `INSERT INTO user_permissions(
   up_userid, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting)
	VALUES ('${id}', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'false', 'false', 'false', 'false')`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  pool.query(
                    `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
LEFT JOIN user_permissions ON user_permissions.up_userid = users.id
WHERE users.id = '${id}'`,
                    (error, response) => {
                      if (error) {
                        console.log(error);
                      } else {
                        res.send(response.rows[0]);
                      }
                    }
                  );
                }
              }
            );
          } else {
            pool.query(
              `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.id = '${id}'`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  res.send(response.rows[0]);
                }
              }
            );
          }
          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Thêm mới tài khoản ${user_username} (ID: ${id})');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/admin/users/edit", function (req, res) {
  const {
    id,
    user_username,
    user_firstname,
    user_lastname,
    user_address,
    user_tel,
    user_status,
    user_email,
    user_wardid,
    user_typeid,
    user_date,
    user_avatar,
    fileRecv,
    FRONTEND_URL,
    uld_old_firstname,
    uld_old_lastname,
    uld_old_address,
    uld_old_tel,
    uld_old_status,
    uld_old_email,
    uld_old_wardid,
    log_date,
    log_userid,
    log_eventtypeid,
  } = req.body;
  console.log(
    id,
    user_username,
    user_address,
    user_tel,
    user_firstname,
    user_lastname,
    user_status,
    user_typeid,
    user_date,
    user_avatar,
    user_email,
    fileRecv,
    user_wardid,
    FRONTEND_URL
  );
  console.log("================================================");
  console.log(
    uld_old_firstname,
    uld_old_lastname,
    uld_old_address,
    uld_old_tel,
    uld_old_status,
    uld_old_email,
    uld_old_wardid,
    log_date,
    log_userid,
    log_eventtypeid
  );

  if (user_typeid === "NV") {
    pool.query(`UPDATE user_permissions
	SET up_eccommercedashboard='false', up_sewingstatus='false', up_customeraccountmanager='false', up_staffaccountmanager='false', up_productmanager='false', up_clothmanager='false', up_ordermanager='true', up_log='false', up_loyaltyprogram='false', up_giftvoucher='false', up_setting='false'
	WHERE up_userid='${id}' `);
  }
  if (user_typeid === "TN") {
    pool.query(`UPDATE user_permissions
	SET up_eccommercedashboard='false', up_sewingstatus='true', up_customeraccountmanager='false', up_staffaccountmanager='false', up_productmanager='false', up_clothmanager='false', up_ordermanager='true', up_log='false', up_loyaltyprogram='false', up_giftvoucher='false', up_setting='false'
	WHERE up_userid='${id}' `);
  }
  
  if (parseInt(fileRecv) === 1) {
    const file = req.files.file;
    const filename = Date.now() + "-" + id + "-" + file.name;
    var newpath = "";
    var image_path = "./images";
    newpath = FRONTEND_URL + "/images/avatar/User" + id + "/";
    image_path = image_path + "/avatar/User" + id + "/" + filename;
    console.log("co file");
    console.log(newpath, image_path);
    pool.query(
      `UPDATE users
	SET user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_avatar='${image_path}', user_email='${user_email}', user_wardid='${user_wardid}'
	WHERE id='${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          if (!fs.existsSync(newpath)) {
            fs.mkdirSync(newpath);
          }
          file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          if(user_typeid == "KH"){
            pool.query(
              `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.id = '${id}'`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  res.send(response.rows[0]);
                }
              }
            );
          } else {
            pool.query(
              `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
LEFT JOIN user_permissions ON user_permissions.up_userid = users.id
WHERE users.id = '${id}'`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  res.send(response.rows[0]);
                }
              }
            );
          }
          
            pool.query(
              `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Chỉnh sửa thông tin tài khoản ${user_username} (ID: ${id})') RETURNING id;`,
              (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  pool.query(
                    `INSERT INTO user_log_detail(
	uld_logid, uld_old_firstname, uld_new_firstname, uld_old_lastname, uld_new_lastname, uld_old_address, uld_new_address, uld_old_tel, uld_new_tel, uld_old_email, uld_new_email, uld_old_wardid, uld_new_wardid, uld_old_status, uld_new_status)
	VALUES ('${response.rows[0].id}', '${uld_old_firstname}', '${user_firstname}', '${uld_old_lastname}', '${user_lastname}', '${uld_old_address}', '${user_address}', '${uld_old_tel}', '${user_tel}', '${uld_old_email}', '${user_email}', '${uld_old_wardid}', '${user_wardid}', '${uld_old_status}', '${user_status}')`,
                    (error, response) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Ghi nhật ký thành công!!!");
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
    pool.query(
      `UPDATE users
	SET  user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_avatar='${user_avatar}', user_email='${user_email}', user_wardid='${user_wardid}'
	WHERE id='${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
           if (user_typeid == "KH") {
             pool.query(
               `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.id = '${id}'`,
               (error, response) => {
                 if (error) {
                   console.log(error);
                 } else {
                   res.send(response.rows[0]);
                 }
               }
             );
           } else {
             pool.query(
               `SELECT users.id, users.user_typeid, users.user_username, users.user_password, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
LEFT JOIN user_permissions ON user_permissions.up_userid = users.id
WHERE users.id = '${id}'`,
               (error, response) => {
                 if (error) {
                   console.log(error);
                 } else {
                   res.send(response.rows[0]);
                 }
               }
             );
           }

          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Chỉnh sửa thông tin tài khoản ${user_username} (ID: ${id})') RETURNING id;`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                pool.query(
                  `INSERT INTO user_log_detail(
	uld_logid, uld_old_firstname, uld_new_firstname, uld_old_lastname, uld_new_lastname, uld_old_address, uld_new_address, uld_old_tel, uld_new_tel, uld_old_email, uld_new_email, uld_old_wardid, uld_new_wardid, uld_old_status, uld_new_status)
	VALUES ('${response.rows[0].id}', '${uld_old_firstname}', '${user_firstname}', '${uld_old_lastname}', '${user_lastname}', '${uld_old_address}', '${user_address}', '${uld_old_tel}', '${user_tel}', '${uld_old_email}', '${user_email}', '${uld_old_wardid}', '${user_wardid}', '${uld_old_status}', '${user_status}')`,
                  (error, response) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Ghi nhật ký thành công!!!");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

router.post("/admin/users/editUserInfo", function (req, res) {
  const {
    id,
    user_username,
    user_address,
    user_tel,
    user_firstname,
    user_lastname,
    user_status,
    user_typeid,
    user_date,
    user_avatar,
    user_email,
    fileRecv,
    token,
    ut_name,
    user_wardid,
    FRONTEND_URL,
  } = req.body;
  console.log(
    id,
    user_username,
    user_address,
    user_tel,
    user_firstname,
    user_lastname,
    user_status,
    user_typeid,
    user_date,
    user_avatar,
    user_email,
    fileRecv,
    token,
    user_wardid,
    FRONTEND_URL
  );
  if (parseInt(fileRecv) === 1) {
    const file = req.files.file;
    const filename = Date.now() + "-" + id + "-" + file.name;
    var newpath = "";
    var image_path = "./images";
    newpath = FRONTEND_URL + "/images/avatar/User" + id + "/";
    image_path = image_path + "/avatar/User" + id + "/" + filename;
    pool.query(
      `UPDATE users
	SET user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_date='${user_date}', user_avatar='${image_path}', user_email='${user_email}', user_wardid='${user_wardid}'
	WHERE id='${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          if (!fs.existsSync(newpath)) {
            fs.mkdirSync(newpath);
          }
          file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          res.send({
            id: parseInt(id),
            user_username: user_username,
            user_address: user_address,
            user_tel: user_tel,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: image_path,
            user_email: user_email,
            user_wardid: user_wardid,
            ut_name: ut_name,
            token: token,
          });
        }
      }
    );
  } else {
    pool.query(
      `UPDATE users
	SET  user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_date='${user_date}', user_avatar='${user_avatar}', user_email='${user_email}', user_wardid='${user_wardid}'
	WHERE id='${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          res.send({
            id: parseInt(id),
            user_username: user_username,
            user_address: user_address,
            user_tel: user_tel,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: user_avatar,
            user_email: user_email,
            user_wardid: user_wardid,
            ut_name: ut_name,
            token: token,
          });
        }
      }
    );
  }
});

router.post("/getOrderData", function (req, res) {
  const { id, provinceId, districtId, wardId, startDate, endDate, orderID } =
    req.body;
  console.log(id, provinceId, districtId, wardId, startDate, endDate);
  var string = "";
  if (provinceId !== 0) {
    string = `AND province.id = '${provinceId}'`;
  }
  if (districtId !== 0) {
    string = string + ` AND district.id = '${districtId}'`;
  }
  if (wardId !== 0) {
    string = string + ` AND ward.id = '${wardId}'`;
  }
  var dateString = "";
  var orderIDString = "";
  if (orderID) {
    orderIDString = `AND orders.id = '${orderID}'`;
  }
  if (startDate) {
    dateString = `AND orders.order_startdate BETWEEN '${startDate}' AND '${endDate}'`;
  } else {
    console.log("khong co startdate");
  }
  console.log(string);
  console.log(`orders.order_startdate BETWEEN '${startDate}' AND '${endDate}'`);
  if (parseInt(id) === 0) {
    pool.query(
      `SELECT order_details.id, order_details.od_orderid, order_details.od_productid, order_details.od_clothid, order_customername, order_wardid, district.id AS order_districtid, province.id AS order_provinceid, CONCAT(order_customeraddress, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_total, order_paymentid, opm_name, order_shippingid, osm_name, order_tailorid, CONCAT(user_lastname, ' ', user_firstname) AS tailor_name, user_tel as tailor_tel, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_image1, os_name FROM order_details 
              INNER JOIN orders ON orders.id = order_details.od_orderid 
              INNER JOIN products ON products.id = order_details.od_productid
			  INNER JOIN order_status ON order_status.id = orders.order_statusid
			  INNER JOIN order_paymentmethod ON order_paymentmethod.id = orders.order_paymentid
			  INNER JOIN order_shippingmethod ON order_shippingmethod.id = orders.order_shippingid
			  INNER JOIN users ON users.id = orders.order_tailorid
			  INNER JOIN ward ON ward.id = orders.order_wardid
			  INNER JOIN district ON district.id = ward.ward_districtid
			  INNER JOIN province ON province.id = ward.ward_provinceid 
        WHERE orders.order_startdate BETWEEN '${startDate}' AND '${endDate}' ${string} `,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
    return true;
  } else {
    pool.query(
      `SELECT order_details.*, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, opm_name, order_shippingid, osm_name, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_image1, cloth.cloth_name, cloth.cloth_image, cloth.cloth_quantity, cloth.cloth_material, os_name FROM order_details 
              INNER JOIN orders ON orders.id = order_details.od_orderid 
              INNER JOIN products ON products.id = order_details.od_productid
			  INNER JOIN cloth ON cloth.id = order_details.od_clothid
			  INNER JOIN order_status ON order_status.id = orders.order_statusid
			  INNER JOIN order_paymentmethod ON order_paymentmethod.id = orders.order_paymentid
			  INNER JOIN order_shippingmethod ON order_shippingmethod.id = orders.order_shippingid
			  WHERE orders.order_userid = '${id}' ${orderIDString} ${dateString}`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
});

router.post("/admin/order/add", function (req, res) {
  const {
    order_customername,
    order_customeraddress,
    order_customeremail,
    order_customerphone,
    order_startdate,
    order_enddate,
    order_subtotal,
    order_discount,
    order_total,
    order_paymentid,
    order_shippingid,
    order_statusid,
    order_userid,
    od_productid,
    od_clothid,
    od_neckline,
    od_bust,
    od_waist,
    od_buttock,
    od_shoulderwidth,
    od_armpitcircumference,
    od_biceps,
    od_wristaround,
    od_sleevelength,
    od_shirtlength,
    od_crotchlength,
    od_dresslength,
    od_pantslength,
    od_thighcircumference,
    haveFile,
    cloth_name,
    order_wardid,
    voucherCode,
    FRONTEND_URL,
  } = req.body;
  const id = uuidv4();
  console.log(
    id,
    order_customername,
    order_customeraddress,
    order_customeremail,
    order_customerphone,
    order_startdate,
    order_enddate,
    order_subtotal,
    order_discount,
    order_total,
    order_paymentid,
    order_shippingid,
    order_statusid,
    order_userid,
    od_productid,
    od_clothid,
    od_neckline,
    od_bust,
    od_waist,
    od_buttock,
    od_shoulderwidth,
    od_armpitcircumference,
    od_biceps,
    od_wristaround,
    od_sleevelength,
    od_shirtlength,
    od_crotchlength,
    od_dresslength,
    od_pantslength,
    od_thighcircumference,
    order_wardid
  );
  if (!voucherCode) {
    console.log("code???", voucherCode);
    console.log("Khong co code");
  } else {
    console.log("có code", voucherCode);
    pool.query(`UPDATE giftvoucher
          SET gv_isactivated='true'
          WHERE id='${voucherCode}'`);
  }
  if (parseInt(haveFile) === 0) {
    console.log("****************************************************");
    console.log("khong co file");
    console.log("cloth id", od_clothid);
    pool.query(
      `INSERT INTO orders(
  id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_wardid)
  VALUES ('${id}', '${order_customername}', '${order_customeraddress}', '${order_customerphone}', '${order_customeremail}', '${order_startdate}', '${order_enddate}', '${order_subtotal}', '${order_discount}', '${order_total}', '${order_paymentid}', '${order_shippingid}', '${order_statusid}', '${order_userid}', '1', '${order_wardid}')`,
      (error, response) => {
        if (error) {
          console.log("1", error);
          res.send({ msg: "ERROR" });
        } else {
          console.log("win");
          pool.query(
            `INSERT INTO order_details(
  od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength)
  VALUES ('${id}', '${od_productid}', '${od_clothid}', '${od_neckline}', '${od_bust}', '${od_waist}', '${od_buttock}', '${od_shoulderwidth}', '${od_armpitcircumference}', '${od_biceps}', '${od_wristaround}', '${od_sleevelength}', '${od_shirtlength}', '${od_crotchlength}', '${od_thighcircumference}', '${od_dresslength}', '${od_pantslength}')`,
            (error, response) => {
              if (error) {
                console.log("2", error);
                res.send({ msg: "ERROR" });
              } else {
                res.send("OK");
              }
            }
          );
        }
      }
    );
  } else {
    console.log("****************************************************");
    console.log("co file");
    const file = req.files.file;
    const filename = Date.now() + "-" + order_userid + "-" + file.name;
    var newpath = "";
    var image_path = "./images";
    newpath = FRONTEND_URL + "/images/Cloth/VCKH/User" + order_userid + "/";
    image_path =
      image_path + "/Cloth/VCKH/User" + order_userid + "/" + filename;
    console.log("cloth id", od_clothid);
    console.log("cloth_name", cloth_name);
    console.log("newpath", newpath);
    console.log("image_path", image_path);
    pool.query(
      `SELECT COUNT(*) FROM cloth WHERE id='${od_clothid}'`,
      (error, response) => {
        if (parseInt(response.rows[0].count) === 0) {
          console.log("tien hanh insert");
          console.log("nhan gia tri id", od_clothid);
          pool.query(
            `INSERT INTO cloth(
	id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image, cloth_isdeleted)
	VALUES ('${od_clothid}', 'Không rõ', '${cloth_name}', '0', '${order_userid}', 'VCKH', '${image_path}', 'false')`,
            (error, response) => {
              if (error) {
                console.log("Loi insert cloth");
                console.log(error);
                res.send(error);
              } else {
                if (!fs.existsSync(newpath)) {
                  fs.mkdirSync(newpath);
                }
                file.mv(`${newpath}${filename}`, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
                pool.query(
                  `INSERT INTO orders(
  id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_wardid)
  VALUES ('${id}', '${order_customername}', '${order_customeraddress}', '${order_customerphone}', '${order_customeremail}', '${order_startdate}', '${order_enddate}', '${order_subtotal}', '${order_discount}', '${order_total}', '${order_paymentid}', '${order_shippingid}', '${order_statusid}', '${order_userid}', '1', '${order_wardid}')`,
                  (error, response) => {
                    if (error) {
                      console.log("1", error);
                      res.send({ msg: "ERROR" });
                    } else {
                      console.log("win");
                      pool.query(
                        `INSERT INTO order_details(
  od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength)
  VALUES ('${id}', '${od_productid}', '${od_clothid}', '${od_neckline}', '${od_bust}', '${od_waist}', '${od_buttock}', '${od_shoulderwidth}', '${od_armpitcircumference}', '${od_biceps}', '${od_wristaround}', '${od_sleevelength}', '${od_shirtlength}', '${od_crotchlength}', '${od_thighcircumference}', '${od_dresslength}', '${od_pantslength}')`,
                        (error, response) => {
                          if (error) {
                            console.log("2", error);
                            res.send({ msg: "ERROR" });
                          } else {
                            res.send("OK");
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
          console.log("bo qua insert");
          pool.query(
            `INSERT INTO orders(
  id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_wardid)
  VALUES ('${id}', '${order_customername}', '${order_customeraddress}', '${order_customerphone}', '${order_customeremail}', '${order_startdate}', '${order_enddate}', '${order_subtotal}', '${order_discount}', '${order_total}', '${order_paymentid}', '${order_shippingid}', '${order_statusid}', '${order_userid}', '1', '${order_wardid}')`,
            (error, response) => {
              if (error) {
                console.log("1", error);
                res.send({ msg: "ERROR" });
              } else {
                console.log("win");
                pool.query(
                  `INSERT INTO order_details(
  od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength)
  VALUES ('${id}', '${od_productid}', '${od_clothid}', '${od_neckline}', '${od_bust}', '${od_waist}', '${od_buttock}', '${od_shoulderwidth}', '${od_armpitcircumference}', '${od_biceps}', '${od_wristaround}', '${od_sleevelength}', '${od_shirtlength}', '${od_crotchlength}', '${od_thighcircumference}', '${od_dresslength}', '${od_pantslength}')`,
                  (error, response) => {
                    if (error) {
                      console.log("2", error);
                      res.send({ msg: "ERROR" });
                    } else {
                      res.send("OK");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  // pool.query(
  //   `INSERT INTO orders(
  // id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid)
  // VALUES ('${id}', '${order_customername}', '${order_customeraddress}', '${order_customerphone}', '${order_customeremail}', '${order_startdate}', '${order_enddate}', '${order_subtotal}', '${order_discount}', '${order_total}', '${order_paymentid}', '${order_shippingid}', '${order_statusid}', '${order_userid}', '1')`,
  //   (error, response) => {
  //     if (error) {
  //       console.log("1", error);
  //       res.send({ msg: "ERROR" });
  //     } else {
  //       console.log("win");
  //      pool.query(
  //        `INSERT INTO order_details(
  // od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength)
  // VALUES ('${id}', '${od_productid}', '${od_clothid}', '${od_neckline}', '${od_bust}', '${od_waist}', '${od_buttock}', '${od_shoulderwidth}', '${od_armpitcircumference}', '${od_biceps}', '${od_wristaround}', '${od_sleevelength}', '${od_shirtlength}', '${od_crotchlength}', '${od_thighcircumference}', '${od_dresslength}', '${od_pantslength}')`,
  //        (error, response) => {
  //          if (error) {
  //            console.log("2", error);
  //            res.send({ msg: "ERROR" });
  //          } else {
  //            res.send({
  //              id,
  //              order_customername,
  //              order_customeraddress,
  //              order_customeremail,
  //              order_startdate,
  //              order_enddate,
  //              order_subtotal,
  //              order_discount,
  //              order_total,
  //              order_paymentid,
  //              order_shippingid,
  //              order_statusid,
  //              order_userid,
  //              od_productid,
  //              od_clothid,
  //              od_neckline,
  //              od_bust,
  //              od_waist,
  //              od_buttock,
  //              od_shoulderwidth,
  //              od_armpitcircumference,
  //              od_biceps,
  //              od_wristaround,
  //              od_sleevelength,
  //              od_shirtlength,
  //              od_crotchlength,
  //              od_dresslength,
  //              od_pantslength,
  //            });
  //          }
  //        }
  //      );
  //     }
  //   }
  // );
});

router.get("/getDetailOrder.:id", function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT order_details.*, order_customername, order_wardid, CONCAT(order_customeraddress, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_processingtime1, order_processingtime2, order_processingtime3, order_processingtime4, order_shippingtime, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, opm_name, order_shippingid, order_tailorid, user_firstname as tailor_firstname, user_lastname as tailor_lastname, user_address as tailor_address, user_tel as tailor_tel, osm_name, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_code, products.product_price, products.product_image1, cloth.cloth_name, cloth.cloth_image, cloth.cloth_quantity, cloth.cloth_material, cloth.cloth_typeid, os_name FROM order_details 
              INNER JOIN orders ON orders.id = order_details.od_orderid 
              INNER JOIN products ON products.id = order_details.od_productid
			  INNER JOIN cloth ON cloth.id = order_details.od_clothid
			  INNER JOIN order_status ON order_status.id = orders.order_statusid
			  INNER JOIN order_paymentmethod ON order_paymentmethod.id = orders.order_paymentid
			  INNER JOIN order_shippingmethod ON order_shippingmethod.id = orders.order_shippingid
			  INNER JOIN users ON users.id = orders.order_tailorid
			  INNER JOIN ward ON ward.id = orders.order_wardid
			  INNER JOIN district ON district.id = ward.ward_districtid
			  INNER JOIN province ON province.id = ward.ward_provinceid
			  WHERE order_details.od_orderid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send({ msg: "ERROR" });
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post("/admin/order/edit", function (req, res) {
  const {} = req.body;
  pool.query(``, (error, response) => {
    if (error) {
      console.log(error);
      res.send({ msg: "ERROR" });
    } else {
      console.log("OK");
      res.send({ msg: "OK" });
    }
  });
});

router.post("/admin/order/processing", async function (req, res) {
  const {
    order_statusid,
    order_tailorid,
    date,
    od_orderid,
    cloth_typeid,
    cloth_quantity,
    od_clothid,
    customername,
    customeremail,
    log_date,
    log_userid,
    log_eventtypeid,
    order_shippingid,
  } = req.body;
  const data = await pool.query(`SELECT * FROM email WHERE id='1'`);
  console.log(data.rows[0]);
  console.log(data.rows[0].e_email);
  console.log(data.rows[0].e_password);

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: data.rows[0].e_email,
      pass: data.rows[0].e_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  if (order_statusid === 1) {
    console.log("đợi thợ may");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_processingtime1='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");

          var content = "";
          content += `
         <div style="margin-bottom: 10px">
            <p stlye="margin: 0px">Xin chào ${customername},</p>
            <p stlye="margin: 0px">
              Đơn hàng ${od_orderid} của bạn đã được
              duyệt, bạn có thể tiến hành theo dõi đơn hàng <a href="http://localhost:3000/account/orders" target="_blank">tại đây</a>
              .
            </p>
            <p stlye="margin: 0px">Trân trọng </p>
            <p stlye="margin: 0px">Nhà may âu phục Thành Phan </p>
          </div>
          <div
            style="
              font-size: 14px;
              border-top: 1px dashed black;
              padding-top: 10px;
              font-style: italic
            "
          >
            <p style="font-weight: 600; margin: 0px">Nhà may âu phục Thành Phan</p>
            <p style="margin: 0px">Địa chỉ: 999/9, Nguyễn Văn Linh, Ninh Kiều, Cần Thơ</p>
            <p style="margin: 0px">Email: phanthanh8499@gmail.com</p>
            <p style="margin: 0px">Hotline: (+84)91 551 80 13</p>
          </div>
    `;
          var mainOptions = {
            // thiết lập đối tượng, nội dung gửi mail
            from: "Nhà may âu phục Thành Phan",
            to: customeremail,
            subject: `Xử lý đơn hàng ${od_orderid}`,
            text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            html: content, //Nội dung html mình đã tạo trên kia :))
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
              // req.flash("mess", "Lỗi gửi mail: " + err); //Gửi thông báo đến người dùng
              res.redirect("/");
            } else {
              console.log("Message sent: " + info.response);
              // req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
              res.redirect("/");
            }
          });

          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Duyệt đơn hàng ID: ${od_orderid}');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        }
      }
    );
  } else if (order_statusid === 2) {
    console.log("đang lấy vải");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_tailorid='${order_tailorid}', order_processingtime2='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");
        }
      }
    );
  } else if (order_statusid === 3) {
    console.log("đang may");
    console.log(
      order_statusid,
      order_tailorid,
      date,
      od_orderid,
      cloth_typeid,
      cloth_quantity,
      od_clothid
    );
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_processingtime3='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          if (cloth_typeid !== "VCKH") {
            console.log("Khong phai VCKH");
            pool.query(
              `UPDATE cloth
              SET cloth_quantity='${cloth_quantity}'
              WHERE id='${od_clothid}';`,
              (error, response) => {
                if (error) {
                  console.log(error);
                  res.send("ERROR2");
                } else {
                  res.send("OK");
                }
              }
            );
          } else {
            console.log("VCKH");
          }
        }
      }
    );
  } else if (order_statusid === 4) {
    console.log("đã may xong");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_processingtime4='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");
          if (order_shippingid === "TNM") {
            var content = "";
            content += `
         <div style="margin-bottom: 10px">
            <p stlye="margin: 0px">Xin chào ${customername},</p>
            <p stlye="margin: 0px">
              Đơn hàng ${od_orderid} của bạn đã may xong. Quý khách vui lòng đến nhà may để tiến hành các thủ tục thanh toán để hoàn tất đơn hàng và nhận hàng.
            </p>
            <p stlye="margin: 0px">Trân trọng </p>
            <p stlye="margin: 0px">Nhà may âu phục Thành Phan </p>
          </div>
          <div
            style="
              font-size: 14px;
              border-top: 1px dashed black;
              padding-top: 10px;
              font-style: italic
            "
          >
            <p style="font-weight: 600; margin: 0px">Nhà may âu phục Thành Phan</p>
            <p style="margin: 0px">Địa chỉ: 999/9, Nguyễn Văn Linh, Ninh Kiều, Cần Thơ</p>
            <p style="margin: 0px">Email: phanthanh8499@gmail.com</p>
            <p style="margin: 0px">Hotline: (+84)91 551 80 13</p>
          </div>
    `;
            var mainOptions = {
              // thiết lập đối tượng, nội dung gửi mail
              from: "Nhà may âu phục Thành Phan",
              to: customeremail,
              subject: `Đơn hàng ${od_orderid} đã may xong`,
              text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
              html: content, //Nội dung html mình đã tạo trên kia :))
            };
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                console.log(err);
                // req.flash("mess", "Lỗi gửi mail: " + err); //Gửi thông báo đến người dùng
                res.redirect("/");
              } else {
                console.log("Message sent: " + info.response);
                // req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
                res.redirect("/");
              }
            });
          } else {
            var content = "";
            content += `
         <div style="margin-bottom: 10px">
            <p stlye="margin: 0px">Xin chào ${customername},</p>
            <p stlye="margin: 0px">
              Đơn hàng ${od_orderid} của bạn đã may xong. Quý khách vui lòng đợi đơn hàng vận chuyển đến địa chỉ đã ghi trong đơn đặt hàng.
            </p>
            <p stlye="margin: 0px">Trân trọng </p>
            <p stlye="margin: 0px">Nhà may âu phục Thành Phan </p>
          </div>
          <div
            style="
              font-size: 14px;
              border-top: 1px dashed black;
              padding-top: 10px;
              font-style: italic
            "
          >
            <p style="font-weight: 600; margin: 0px">Nhà may âu phục Thành Phan</p>
            <p style="margin: 0px">Địa chỉ: 999/9, Nguyễn Văn Linh, Ninh Kiều, Cần Thơ</p>
            <p style="margin: 0px">Email: phanthanh8499@gmail.com</p>
            <p style="margin: 0px">Hotline: (+84)91 551 80 13</p>
          </div>
    `;
            var mainOptions = {
              // thiết lập đối tượng, nội dung gửi mail
              from: "Nhà may âu phục Thành Phan",
              to: customeremail,
              subject: `Đơn hàng ${od_orderid} đã may xong`,
              text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
              html: content, //Nội dung html mình đã tạo trên kia :))
            };
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                console.log(err);
                // req.flash("mess", "Lỗi gửi mail: " + err); //Gửi thông báo đến người dùng
                res.redirect("/");
              } else {
                console.log("Message sent: " + info.response);
                // req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
                res.redirect("/");
              }
            });
          }
        }
      }
    );
  } else if (order_statusid === 5) {
    console.log("đang vận chuyểny");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_shippingtime='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");
        }
      }
    );
  } else if (order_statusid === 6) {
    console.log("hoàn tất");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}', order_enddate='${date}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");
        }
      }
    );
  } else {
    console.log("Da huy");
    console.log(order_statusid, order_tailorid, date, od_orderid);
    pool.query(
      `UPDATE orders
	SET order_statusid='${order_statusid}'
	WHERE id='${od_orderid}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send("ERROR");
        } else {
          console.log("OK");
          res.send("OK");
          pool.query(
            `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Huỷ hoá đơn ID: ${od_orderid}');`,
            (error, response) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Ghi nhật ký thành công!");
              }
            }
          );
        }
      }
    );
  }
});

router.post("/admin/order/delete", function (req, res) {
  const { od_orderid,
            log_date,
            log_userid,
            log_eventtypeid } = req.body;
  pool.query(
    `DELETE FROM order_details
WHERE od_orderid = '${od_orderid}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        pool.query(
          `DELETE FROM orders
      WHERE id = '${od_orderid}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              
              pool.query(
                `INSERT INTO log(
	log_userid, log_eventtypeid, log_date, log_description)
	VALUES ('${log_userid}', '${log_eventtypeid}',  '${log_date}',  'Xoá hoá đơn ID: ${od_orderid}');`,
                (error, response) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Ghi nhật ký thành công!");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.get(`/getProvince`, function (req, res) {
  pool.query(`SELECT * FROM province`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.get(`/getDistrict.:id`, function (req, res) {
  const { id } = req.params;
  console.log(id);
  pool.query(
    `SELECT * FROM district WHERE district_provinceid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get(`/getWard.:provinceid&:districtid`, function (req, res) {
  const { provinceid, districtid } = req.params;
  pool.query(
    `SELECT * FROM ward WHERE ward_provinceid = '${provinceid}' AND ward_districtid = '${districtid}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get(`/getAddress.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT ward.*, district.district_prefix, district.district_name, province.province_name FROM ward
INNER JOIN district ON district.id = ward.ward_districtid
INNER JOIN province ON province.id = ward.ward_provinceid
WHERE ward.id = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/getDataCount`, function (req, res) {
  const { startDate, endDate } = req.body;
  console.log(startDate, endDate);
  pool.query(
    `SELECT  (
        SELECT COUNT(*)
        FROM   users WHERE user_typeid = 'KH'
        ) AS count_user,
        (
        SELECT COUNT(*)
        FROM   orders WHERE order_statusid = '0' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
        ) AS count_order,
		(
		SELECT COUNT(*)
		FROM products 
		) AS count_product,
		(
		SELECT CAST(SUM(order_total) AS FLOAT)/1000000 
		FROM orders WHERE order_statusid = '6' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
		) AS order_total`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/getRevenue`, function (req, res) {
  const { startDate, endDate, startDateLW, endDateLW } = req.body;
  pool.query(
    `WITH table1 AS (
SELECT to_char(order_startdate, 'Day') as revenue_date, CAST(SUM(order_total) AS FLOAT)/1000000 AS revenue 
  FROM orders WHERE order_statusid='6' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY revenue_date ORDER BY revenue_date ASC),
table2 AS (
SELECT to_char(order_startdate, 'Day') as revenue_date, CAST(SUM(order_total) AS FLOAT)/1000000 AS revenue 
  FROM orders WHERE order_statusid='6' AND order_startdate BETWEEN '${startDateLW}' AND '${endDateLW}'
  GROUP BY revenue_date ORDER BY revenue_date ASC),
table3 AS (
SELECT to_char(GENERATE_SERIES('2021-10-18', '2021-10-24 23:59:59', '1 day'::INTERVAL), 'Day') AS revenue_date
)
SELECT table3.revenue_date, COALESCE(table1.revenue, 0) AS Current_Week, COALESCE(table2.revenue,0) AS Previous_Week FROM table3
LEFT JOIN table2 ON table2.revenue_date = table3.revenue_date
LEFT JOIN table1 ON table1.revenue_date = table3.revenue_date
`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
        console.log(response.rows);
      }
    }
  );
});

router.post(`/admin/getCountProductSold`, function (req, res) {
  const { startDate, endDate } = req.body;
  pool.query(
    `WITH table1 AS (
SELECT pt_name as name, COUNT(*) AS value FROM orders
INNER JOIN order_details ON order_details.od_orderid = orders.id
INNER JOIN products ON products.id = order_details.od_productid
INNER JOIN producttypes ON products.product_typeid = producttypes.id
WHERE order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY name),
table2 AS (
SELECT id, pt_name as name FROM producttypes)
SELECT table2.name, COALESCE(value,0) as value FROM table2
LEFT JOIN table1 ON table2.name = table1.name
ORDER BY name ASC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
        console.log(response.rows);
      }
    }
  );
});

router.post(`/admin/getCountOrder`, function (req, res) {
  const { startDate, endDate } = req.body;
  pool.query(
    `SELECT 
(
	SELECT COUNT(*)
	FROM orders WHERE order_statusid = '0' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS processing_count,
(
	SELECT COUNT(*)
	FROM orders 
 WHERE 
order_statusid >= 1 AND order_statusid < 4
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS sewing_count,
(
	SELECT COUNT(*)
	FROM orders 
 WHERE 
order_statusid = 5
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS sewing_complete_count,
(
	SELECT COUNT(*)
	FROM orders WHERE order_statusid = '5' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS shipping_count,
(
	SELECT COUNT(*)
	FROM orders WHERE order_statusid = '6' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS complete_count,
(
	SELECT COUNT(*)
	FROM orders WHERE order_statusid = '10' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS cancel_count`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/getTailorOrder`, function (req, res) {
  const { startDate, endDate } = req.body;
  pool.query(
    `WITH table1 AS(
SELECT CONCAT(users.user_lastname, ' ', users.user_firstname) AS name
FROM users
WHERE users.user_typeid = 'NV' AND user_date <= '${endDate}'),
table2 AS (
SELECT CONCAT(users.user_lastname, ' ', users.user_firstname) AS name, COUNT(orders.id) AS value 
FROM orders 
LEFT JOIN users ON users.id = orders.order_tailorid
WHERE orders.order_tailorid > 1
AND (orders.order_statusid >= '4' AND orders.order_statusid <= '6') 
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY name ORDER BY name ASC
)
SELECT table1.name, COALESCE(table2.value, 0) AS value
FROM table1
LEFT JOIN table2 ON table1.name = table2.name`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/getTailorsData`, function (req, res) {
  const { startDate, endDate, total_order } = req.body;
  pool.query(
    `WITH table1 AS(
SELECT id AS user_id,
	user_username, user_avatar, user_lastname, user_firstname
FROM users
WHERE users.user_typeid = 'NV' AND user_date <= '${endDate}'),
table2 AS (
SELECT users.id AS user_id, COUNT(orders.id) AS value 
FROM orders 
LEFT JOIN users ON users.id = orders.order_tailorid
WHERE orders.order_tailorid > 1
AND (orders.order_statusid >= '4' AND orders.order_statusid <= '6') 
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY user_id ORDER BY user_id ASC
),
table3 AS (
SELECT users.id AS user_id, COUNT(orders.id) AS value 
FROM orders 
LEFT JOIN users ON users.id = orders.order_tailorid
WHERE orders.order_tailorid > 1
AND (orders.order_statusid > '1' AND orders.order_statusid < '4') 
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY user_id ORDER BY user_id ASC
)
SELECT table1.user_id AS id, user_avatar, user_username, user_lastname, user_firstname, COALESCE(table2.value, 0) AS complete_order, COALESCE(table3.value, 0) AS processing_order, ${total_order} AS total_order, (COALESCE(table2.value, 0)-${total_order}>=0) AS is_complete
FROM table1
LEFT JOIN table2 ON table1.user_id = table2.user_id
LEFT JOIN table3 ON table1.user_id = table3.user_id`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/getOrderCount`, function (req, res) {
  const { startDate, endDate, startDateLW, endDateLW } = req.body;
  console.log(startDate, endDate, startDateLW, endDateLW);
  pool.query(
    `SELECT  (
        SELECT COUNT(*)
        FROM users WHERE user_typeid = 'NV' AND user_date <= '${endDate}'
        ) AS count_tailor,
        (
        SELECT COUNT(*)
        FROM orders WHERE order_startdate BETWEEN '${startDate}' AND '${endDate}'
        ) AS count_order,
		(
        SELECT COUNT(*)
        FROM orders WHERE (order_statusid >= '4' AND order_statusid <= '6') AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
        ) AS count_completeorder,
		(
		SELECT COUNT(*)
		FROM orders WHERE order_startdate BETWEEN '${startDate}' AND '${endDate}'
		) AS order_total,
		(
		SELECT COUNT(*)
		FROM orders WHERE order_startdate BETWEEN '${startDateLW}' AND '${endDateLW}'
		) AS order_pretotal`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get(
  `/livesearch&name=:name&type=:type&color=:color`,
  function (req, res) {
    const { name, type, color } = req.params;
    var string1 = " ";
    var string2 = " ";
    if (type !== "All") {
      string1 = ` AND product_typeid = '${type}' `;
    }
    if (color !== "All") {
      string2 = ` AND (unaccent(product_color) ILIKE '%${color}%'
OR product_color ILIKE '%${color}%') `;
    }
    pool.query(
      `SELECT * FROM products 
WHERE (unaccent(product_name) ILIKE '%${name}%'
OR product_name ILIKE '%${name}%)') 
${string1}
${string2}`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
);

router.get(`/getUserPermissions.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT users.user_typeid, user_permissions.* FROM user_permissions 
INNER JOIN users ON users.id = user_permissions.up_userid 
WHERE up_userid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/editUserPermissions`, function (req, res) {
  const {
    up_userid,
    up_eccommercedashboard,
    up_sewingstatus,
    up_customeraccountmanager,
    up_staffaccountmanager,
    up_productmanager,
    up_clothmanager,
    up_ordermanager,
    up_log,
    up_loyaltyprogram,
    up_giftvoucher,
    up_setting,
  } = req.body;
  console.log(
    up_sewingstatus,
    up_log,
    up_loyaltyprogram,
    up_giftvoucher,
    up_setting
  );
  pool.query(
    `UPDATE user_permissions
	SET up_eccommercedashboard='${up_eccommercedashboard}', up_sewingstatus='${up_sewingstatus}', up_customeraccountmanager='${up_customeraccountmanager}', up_staffaccountmanager='${up_staffaccountmanager}', up_productmanager='${up_productmanager}', up_clothmanager='${up_clothmanager}', up_ordermanager='${up_ordermanager}', up_log='${up_log}', up_loyaltyprogram='${up_loyaltyprogram}', up_giftvoucher='${up_giftvoucher}', up_setting='${up_setting}'
	WHERE up_userid='${up_userid}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        res.send("OK");
      }
    }
  );
});

router.post(`/getActivityLog`, function (req, res) {
  const { functiontypeid, eventtypeid, startDate, endDate } = req.body;
  var functionString = "";
  var eventtypeString = "";
  if (functiontypeid !== "All") {
    functionString = `AND eventtype.et_functiontypeid = '${functiontypeid}'`;
  }
  if (eventtypeid !== "All") {
    if (eventtypeid === "Add") {
      eventtypeString = `AND (log_eventtypeid = 'APF' OR log_eventtypeid = 'ACF' OR log_eventtypeid = 'ACA' OR log_eventtypeid = 'ASA')`;
    } else if (eventtypeid === "Edit") {
      eventtypeString = `AND (log_eventtypeid = 'EPF' OR log_eventtypeid = 'ECF' OR log_eventtypeid = 'ECA' OR log_eventtypeid = 'ESA')`;
    } else if (eventtypeid === "Delete") {
      eventtypeString = `AND (log_eventtypeid = 'DPF' OR log_eventtypeid = 'DCF' OR log_eventtypeid = 'DCA' OR log_eventtypeid = 'DSA')`;
    } else if (eventtypeid === "Cancel") {
      eventtypeString = `AND log_eventtypeid = 'COF'`;
    } else if (eventtypeid === "Processing") {
      eventtypeString = `AND log_eventtypeid = 'POF'`;
    } else if (eventtypeid === "Block") {
      eventtypeString = `AND (log_eventtypeid = 'BCA' OR log_eventtypeid = 'BSA')`;
    } else if (eventtypeid === "Unblock") {
      eventtypeString = `AND (log_eventtypeid = 'UCA' OR log_eventtypeid = 'USA')`;
    } else {
      eventtypeString = `AND log_eventtypeid = '${eventtypeid}'`;
    }
  }
  console.log(functionString);
  console.log(eventtypeString);
  console.log(startDate);
  console.log(endDate);
  pool.query(
    `SELECT log.*, users.user_username, eventtype.et_name, functiontype.ft_name FROM log
INNER JOIN users ON users.id = log.log_userid
INNER JOIN eventtype ON eventtype.id = log_eventtypeid
INNER JOIN functiontype ON functiontype.id = eventtype.et_functiontypeid
WHERE log_date BETWEEN '${startDate}' AND '${endDate}'
${functionString}
${eventtypeString}
ORDER BY log_date DESC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get(`/getFunctionTypeData`, function (req, res) {
  pool.query(`SELECT * FROM functiontype`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.get(`/getEventTypeData.:functiontypeid`, function (req, res) {
  const { functiontypeid } = req.params;
  var string = "";
  if (functiontypeid !== "All") {
    string = `WHERE et_functiontypeid = '${functiontypeid}'`;
    pool.query(`SELECT * FROM eventtype ${string}`, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    });
  } else {
    res.send([
      { id: "Add", et_name: "Thêm mới" },
      { id: "Edit", et_name: "Chỉnh sửa" },
      { id: "Delete", et_name: "Xoá" },
      { id: "Cancel", et_name: "Huỷ bỏ" },
      { id: "Processing", et_name: "Duyệt" },
      { id: "Block", et_name: "Khoá tài khoản" },
      { id: "Unblock", et_name: "Mở khoá tài khoản" },
    ]);
  }
});

router.get(`/getProductLogDetail.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM product_log_detail WHERE pld_logid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows[0]);
      }
    }
  );
});

router.get(`/getClothLogDetail.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM cloth_log_detail WHERE cld_logid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows[0]);
      }
    }
  );
});

router.get(`/getUserLogDetail.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT user_log_detail.*, 
CONCAT(uld_old_address, ', ', old_ward.ward_prefix, ' ', old_ward.ward_name, ', ', old_district.district_prefix, ' ', old_district.district_name, ', ', old_province.province_name) AS uld_old_address,
CONCAT(uld_new_address, ', ', new_ward.ward_prefix, ' ', new_ward.ward_name, ', ', new_district.district_prefix, ' ', new_district.district_name, ', ', new_province.province_name) AS uld_new_address FROM user_log_detail
INNER JOIN ward AS new_ward ON new_ward.id  = user_log_detail.uld_new_wardid
INNER JOIN district AS new_district ON new_district.id = new_ward.ward_districtid
INNER JOIN province AS new_province ON new_province.id = new_ward.ward_provinceid
INNER JOIN ward AS old_ward ON old_ward.id  = user_log_detail.uld_old_wardid
INNER JOIN district AS old_district ON old_district.id = old_ward.ward_districtid
INNER JOIN province AS old_province ON old_province.id = old_ward.ward_provinceid
WHERE uld_logid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows[0]);
      }
    }
  );
});

router.post(`/getLoyaltyCustomer`, function (req, res) {
  const { provinceId, districtId, wardId, startDate, endDate } = req.body;
  var string = "";
  if (provinceId != 0) {
    string = `AND province.id = '${provinceId}'`;
  }
  if (districtId != 0) {
    string = string + " " + `AND district.id = '${districtId}'`;
  }
  if (wardId != 0) {
    string = string + " " + `AND ward.id = '${wardId}'`;
  }
  console.log(string);
  console.log(startDate, endDate);
  pool.query(
    `WITH table1 AS(
	SELECT order_userid AS customer_id, COUNT(*) FROM orders
	WHERE order_statusid = '6' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY customer_id),
table2 AS (
	SELECT users.id, users.user_typeid, users.user_username, users.user_firstname, users.user_lastname, CONCAT(user_address, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS user_address, users.user_tel, users.user_status, users.user_date, users.user_avatar, users.user_email, ward.ward_prefix, ward.ward_name, ward.ward_districtid, district.district_prefix, district.district_name, ward.ward_provinceid, province.province_name FROM users
LEFT JOIN ward ON ward.id = users.user_wardid
LEFT JOIN district ON district.id = ward.ward_districtid
LEFT JOIN province ON province.id = ward.ward_provinceid
WHERE users.user_typeid = 'KH' AND user_isdeleted = 'false' ${string}
)
SELECT table2.*, COALESCE(table1.count, 0) AS order_count
FROM table2
LEFT JOIN table1 ON table2.id = table1.customer_id
ORDER BY order_count DESC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post(`/getGiftVoucherData`, function (req, res) {
  const { id, voucherDiscount, isActive, startDate, endDate } = req.body;
  var string = "";
  var string2 = "";
  console.log(isActive);
  if (voucherDiscount !== 0) {
    string = `giftvoucher.gv_discount = '${voucherDiscount}' AND `;
  }
  if (isActive !== "all") {
    string2 = `giftvoucher.gv_isactivated = '${isActive}' AND `;
  }
  if (id === 1) {
    pool.query(
      `SELECT giftvoucher.*, users.user_username FROM giftvoucher
INNER JOIN users ON users.id = giftvoucher.gv_userid
WHERE ${string} ${string2} giftvoucher.gv_creationdate BETWEEN '${startDate}' AND '${endDate}'`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  } else {
    pool.query(
      `SELECT giftvoucher.*, users.user_username FROM giftvoucher
INNER JOIN users ON users.id = giftvoucher.gv_userid
WHERE giftvoucher.gv_userid = '${id}'
AND giftvoucher.gv_isactivated = 'false'
ORDER BY giftvoucher.gv_expirationdate ASC`,
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(response.rows);
        }
      }
    );
  }
});

router.get(`/getGiftVoucherMenu.:voucherDiscount`, function (req, res) {
  const { voucherDiscount } = req.params;
  console.log(voucherDiscount);
  var string = "";
  if (voucherDiscount !== 0) {
    string = `giftvoucher.gv_discount = '${voucherDiscount}' AND `;
  }
  var now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  console.log(now);
  pool.query(
    `SELECT * FROM giftvoucher
WHERE ${string} giftvoucher.gv_isactivated = 'false' AND gv_userid = '1'
ORDER BY gv_expirationdate ASC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.post(`/admin/add/voucher`, async function (req, res) {
  const {
    gv_qty,
    gv_discription,
    gv_discount,
    gv_creationdate,
    gv_expirationdate,
  } = req.body;
  console.log(
    gv_qty,
    gv_discription,
    gv_discount,
    gv_creationdate,
    gv_expirationdate
  );
  var id = makeid(20);
  pool.query(
    `INSERT INTO giftvoucher(
	id, gv_discription, gv_discount, gv_creationdate, gv_expirationdate, gv_isactivated, gv_userid)
	VALUES ('${id}', '${gv_discription}', '${gv_discount}', '${gv_creationdate}', '${gv_expirationdate}', 'false', '1')`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        pool.query(
          `SELECT giftvoucher.*, users.user_username FROM giftvoucher
INNER JOIN users ON users.id = giftvoucher.gv_userid
WHERE giftvoucher.id = '${id}'`,
          (error, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log(response.rows);
              console.log(response.rows[0]);
              res.send(response.rows[0]);
            }
          }
        );
      }
    }
  );
});

router.get(`/useVoucher.:id`, function (req, res) {
  const { id } = req.params;
  const now = new Date();
  pool.query(
    `SELECT * FROM giftvoucher WHERE id='${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        if (response.rows.length === 0) {
          res.send("NO");
        } else {
          if (response.rows[0].gv_expirationdate <= now) {
            res.send("EXPIRED");
            return false;
          }
          if (response.rows[0].gv_isactivated === true) {
            res.send("ISUSED");
          } else {
            res.send(response.rows[0]);
          }
        }
      }
    }
  );
});

router.post(`/admin/giftVoucher/giveUser`, function (req, res) {
  const {
    log_date,
    log_userid,
    log_eventtypeid,
    id,
    user_username,
    voucherList,
    dateList,
  } = req.body;
  var voucherL = JSON.parse(voucherList);
  var dateL = JSON.parse(dateList);
  for (let i = 0; i < voucherL.length; i++) {
    pool.query(`UPDATE giftvoucher
	SET gv_expirationdate='${dateL[i].gv_expirationdate}', gv_userid='${id}'
	WHERE id='${voucherL[i].id}';`);
  }
});

router.get(`/admin/emailConfig/getData`, function (req, res) {
  pool.query(`SELECT * FROM email WHERE id='1'`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows[0]);
    }
  });
});

router.post(`/admin/emailConfig/update`, function (req, res) {
  const { email, password } = req.body;
  pool.query(
    `UPDATE email
	SET e_email='${email}', e_password='${password}'
	WHERE id='1'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        res.send("OK");
      }
    }
  );
});

router.get(`/getOrderHaveCloth.:id`, function (req, res) {
  const { id } = req.params;
  pool.query(
    `SELECT order_details.id, order_details.od_orderid, cloth_name FROM order_details 
INNER JOIN cloth ON cloth.id = order_details.od_clothid
WHERE order_details.od_clothid = '${id}'`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get(`/getProductCode`, function (req, res) {
  pool.query(`SELECT id, product_code FROM products`, (error, response) => {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      res.send(response.rows);
    }
  });
});

router.get(`/getUserTypeData`, function (req, res) {
  pool.query(`SELECT * FROM user_types`, (error, response) => {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      res.send(response.rows);
    }
  });
});

router.get(`/getUserDataWithPermissions`, function (req, res) {
  pool.query(
    `SELECT users.id, user_username, user_typeid, user_avatar, ut_name, up_eccommercedashboard, up_sewingstatus, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager, up_log, up_loyaltyprogram, up_giftvoucher, up_setting FROM users
INNER JOIN user_permissions ON user_permissions.up_userid = users.id
INNER JOIN user_types ON user_types.id = users.user_typeid`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.send("ERROR");
      } else {
        res.send(response.rows);
      }
    }
  );
});

module.exports = router;
