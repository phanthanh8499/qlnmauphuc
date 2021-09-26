var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt")
const { Pool, Client } = require("pg");
var cors = require("cors");
const fileUpload = require('express-fileupload');
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

/* GET home page. */
router.get("/", function (req, res, next) {});

// api get data from postgresql
router.post("/signin", function (req, res, next) {
  // get data
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  pool.query(
    `SELECT * FROM users WHERE user_username = '${username}' OR user_email = '${username}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        var check = bcrypt.compareSync(
          password,
          response.rows[0].user_password
        );
        if (!check) {
          return;
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
            // Copy het tat ca cac phan tu trong mang
            token,
          });
        }
      }
    }
  );
});

router.post("/signup", async function (req, res, next) {
  var username = req.body.username,
    password = req.body.password,
    email = req.body.email;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  var newpassword = hashPass;
  if (!username || !password) {
    console.log("Thieu thong tin");
  } else {
    pool.query(
      "INSERT INTO users (user_username, user_password, user_typeid, user_status, user_date, user_avatar, user_email) VALUES ($1, $2, 'KH', 'active', NOW()::TIMESTAMP, './images/avatar/user-image.jpg', $3)",
      [username, newpassword, email],
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send(
            "Đã insert thành công! user: " +
              username 
          );
        }
      }
    );
  }
});

router.get("/admin/users", function (req, res) {
  pool.query(
    `SELECT * FROM users WHERE user_typeid='KH'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
});

router.get("/getProductData", function (req, res) {
  pool.query(`SELECT * FROM products`,
  (error, response) => {
    if(error){
      console.log(error)
    } else {
      res.send(response.rows);
    }
  })
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
    frontEndAdmURL,
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
  if (product_typeid === "BFM") {
    newpath = frontEndURL + "/images/Blazer/" + product_code + "/";
    admpath = frontEndAdmURL + "/images/Blazer/" + product_code + "/";
    product_image1 =
      product_image1 + "/Blazer/" + product_code + "/" + filename1;
    product_image2 =
      product_image2 + "/Blazer/" + product_code + "/" + filename2;
    product_image3 =
      product_image3 + "/Blazer/" + product_code + "/" + filename3;
    product_image4 =
      product_image4 + "/Blazer/" + product_code + "/" + filename4;
  }
  if (product_typeid === "SFM") {
    newpath = frontEndURL + "/images/Suit/" + product_code + "/";
    admpath = frontEndAdmURL + "/images/Suit/" + product_code + "/";
    product_image1 = product_image1 + "/Suit/" + product_code + "/" + filename1;
    product_image2 = product_image2 + "/Suit/" + product_code + "/" + filename2;
    product_image3 = product_image3 + "/Suit/" + product_code + "/" + filename3;
    product_image4 = product_image4 + "/Suit/" + product_code + "/" + filename4;
  }
  if (product_typeid === "TFM") {
    newpath = frontEndURL + "/images/Tuxedo/" + product_code + "/";
    admpath = frontEndAdmURL + "/images/Tuxedo/" + product_code + "/";
    product_image1 =
      product_image1 + "/Tuxedo/" + product_code + "/" + filename1;
    product_image2 =
      product_image2 + "/Tuxedo/" + product_code + "/" + filename2;
    product_image3 =
      product_image3 + "/Tuxedo/" + product_code + "/" + filename3;
    product_image4 =
      product_image4 + "/Tuxedo/" + product_code + "/" + filename4;
  }
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
    frontEndURL,
    frontEndAdmURL
  );
  pool.query(
    `INSERT INTO products(
	product_code, product_typeid, product_name, product_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3)
	VALUES ('${product_code}', '${product_typeid}', '${product_name}', '${product_price}', '${product_color}', '${product_material}', '${product_lining}', '${product_size}', '${product_thickness}', '${product_softness}', '${product_elasticity}', '${product_introduction1}', '${product_introduction2}', '${product_introduction3}', '${product_introduction4}', '${product_introduction5}', '${product_image4}', '${product_image1}', '${product_image2}', '${product_image3}')`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ message: "Them san pham thanh cong" });
        if (!fs.existsSync(newpath)) {
          fs.mkdirSync(newpath);
        }
        if (!fs.existsSync(admpath)) {
          fs.mkdirSync(admpath);
        }
        file1.mv(`${admpath}${filename1}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file1.mv(`${newpath}${filename1}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file2.mv(`${admpath}${filename2}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file2.mv(`${newpath}${filename2}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file3.mv(`${admpath}${filename3}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file3.mv(`${newpath}${filename3}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file4.mv(`${admpath}${filename4}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file4.mv(`${newpath}${filename4}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  );
});

router.get("/getDetailProduct.:id", function (req, res){
  const {id} = req.params;
  pool.query(`SELECT * FROM products WHERE id = ${id}`,
  (error, response) => {
    if(error){
      console.log(error);
    } else {
      res.send(response.rows);
    }
  })
});

router.post("/admin/products/edit", function (req, res){
  const {
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
  } = req.body;
  pool.query(
    `UPDATE products SET product_typeid='${product_typeid}', product_name='${product_name}', product_price='${product_price}', product_color='${product_color}', product_material='${product_material}', product_lining='${product_lining}', product_size='${product_size}', product_thickness='${product_thickness}', product_softness='${product_softness}', product_elasticity='${product_elasticity}', product_introduction1='${product_introduction1}', product_introduction2='${product_introduction2}', product_introduction3='${product_introduction3}', product_introduction4='${product_introduction4}', product_introduction5='${product_introduction5}' WHERE product_code='${product_code}'`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Chỉnh sửa thông tin thành công!");
      }
    }
  );
})

router.get("/admin/products/delete.:id", function (req, res) {
  const {id} = req.params;
  console.log(id);
  pool.query(`DELETE FROM products WHERE id='${id}'`,
  (error, response) => {
    if(error){
      console.log(error);
    } else {
      console.log("Xoá thành công sản phẩm có id là: ", id);
    }
  })
})

router.get("/getClothData", function(req, res) {
  pool.query(
    `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
})

router.post("/admin/cloth/add", function (req, res) {
  // console.log("???");
  const {
    id,
    cloth_material,
    cloth_name,
    cloth_quantity,
    cloth_userid,
    cloth_typeid,
    frontEndURL,
    frontEndAdmURL,
  } = req.body;
  const file = req.files.file;
  const filename = file.name;
  var newpath = "";
  var admpath = "";
  var cloth_image = "./images";
  newpath = frontEndURL + "/images/Cloth/" + cloth_typeid + "/";
  admpath = frontEndAdmURL + "/images/Cloth/" + cloth_typeid + "/";
  cloth_image = cloth_image + "/Cloth/" + cloth_typeid + "/" + filename;
  pool.query(
    `INSERT INTO cloth(
	id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image)
	VALUES ('${id}', '${cloth_material}', '${cloth_name}', '${cloth_quantity}', '${cloth_userid}', '${cloth_typeid}', '${cloth_image}');`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send({ message: "Them san pham thanh cong" });
        if (!fs.existsSync(newpath)) {
          fs.mkdirSync(newpath);
        }
        if (!fs.existsSync(admpath)) {
          fs.mkdirSync(admpath);
        }
        file.mv(`${admpath}${filename}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        file.mv(`${newpath}${filename}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  );
});

router.get("/getDetailCloth.:id", function (req, res) {
  const { id } = req.params;
  pool.query(`SELECT * FROM cloth WHERE id = ${id}`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
});

router.post("/admin/cloth/edit", function (req, res) {
  const {
    id,
    cloth_material,
    cloth_name,
    cloth_quantity,
    cloth_userid,
    cloth_typeid,
  } = req.body;
  pool.query(
    `UPDATE cloth
	SET cloth_name='${cloth_name}', cloth_quantity='${cloth_quantity}', cloth_typeid='${cloth_typeid}'
	WHERE id = '${id}' AND cloth_material = '${cloth_material}';`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Chỉnh sửa thông tin thành công!");
      }
    }
  );
});

router.get("/admin/cloth/delete.:id", function (req, res) {
  const { id } = req.params;
  pool.query(`DELETE FROM cloth WHERE id='${id}'`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Xoá thành công sản phẩm có id là: ", id);
    }
  });
});

router.get("/getMeasurementsData.:id", function (req, res) {
  const {id} = req.params;
  if(parseInt(id) === 0){
    pool.query(`SELECT * FROM measurements`, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    });
  } else {
    pool.query(`SELECT * FROM measurements WHERE m_userid = '${id}'`, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    });
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
    m_gender
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
        console.log('OK');
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
        res.send({msg: "ERROR"})
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
  console.log(id)
  // pool.query(`DELETE FROM measurements WHERE id='${id}'`, (error, response) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Xoá thành công sản phẩm có id là: ", id);
  //   }
  // });
});

router.post("/admin/users/edit", function (req, res) {
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
    FRONTEND_URL,
    FRONTEND_ADM_URL,
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
    FRONTEND_URL,
    FRONTEND_ADM_URL,
  );
  if(parseInt(fileRecv) === 1){
    const file = req.files.file;
    const filename = Date.now() + "-" + id + "-" + file.name;
    var newpath = "";
    var admpath = "";
    var image_path = "./images";
    newpath = FRONTEND_URL + "/images/avatar/";
    admpath = FRONTEND_ADM_URL + "/images/avatar/";
    image_path = image_path + "/avatar/" + filename;
    console.log("co file");
    console.log(newpath, admpath, image_path);
    pool.query(
      `UPDATE users
	SET user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_date='${user_date}', user_avatar='${image_path}', user_email='${user_email}'
	WHERE id='${id}'`,
      (error, response) => {
        if (error) {
          console.log(error);
          res.send({ msg: "ERROR" });
        } else {
          if (!fs.existsSync(newpath)) {
            fs.mkdirSync(newpath);
          }
          if (!fs.existsSync(admpath)) {
            fs.mkdirSync(admpath);
          }
          file.mv(`${admpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
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
            token: token,
          });
        }
      }
    );
  } else {
    pool.query(
      `UPDATE users
	SET  user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_date='${user_date}', user_avatar='${user_avatar}', user_email='${user_email}'
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
             token: token,
           });
        }
      }
    );
  }
});

module.exports = router;
