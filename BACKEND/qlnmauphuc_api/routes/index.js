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

/* GET home page. */
router.get("/", function (req, res, next) {});

// api get data from postgresql
router.post("/signin", function (req, res, next) {
  // get data
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  pool.query(
    `SELECT * FROM users WHERE user_username = '${username}' OR user_tel = '${username}'`,
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
              // Copy het tat ca cac phan tu trong mang
              token,
            });
          }
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
      "INSERT INTO users (user_username, user_password, user_typeid, user_status, user_date, user_avatar, user_tel) VALUES ($1, $2, 'KH', 'active', NOW()::TIMESTAMP, './images/avatar/user-image.jpg', $3)",
      [username, newpassword, email],
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Đã insert thành công! user: " + username);
        }
      }
    );
  }
});

router.get("/getUserData", function (req, res) {
  pool.query(
    `SELECT id, user_username, user_tel, user_status FROM users`,
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
  pool.query(`SELECT * FROM products`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  });
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
});

router.get("/admin/products/delete.:id", function (req, res) {
  const { id } = req.params;
  console.log(id);
  pool.query(`DELETE FROM products WHERE id='${id}'`, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Xoá thành công sản phẩm có id là: ", id);
    }
  });
});

router.post("/getClothData", function (req, res) {
  const { cloth_material } = req.body;
  if (cloth_material) {
    pool.query(
      `SELECT DISTINCT cloth.id, cloth.cloth_material, cloth.cloth_name, cloth.cloth_quantity, cloth.cloth_userid, cloth.cloth_typeid, cloth.cloth_image, clothtypes.ct_name, user_username, user_firstname, user_lastname
FROM cloth
INNER JOIN clothtypes ON clothtypes.id = cloth.cloth_typeid
INNER JOIN users ON users.id = cloth.cloth_userid
WHERE cloth.cloth_material = '${cloth_material}'`,
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
INNER JOIN users ON users.id = cloth.cloth_userid`,
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
	id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image)
	VALUES ('${id}', '${cloth_material}', '${cloth_name}', '${cloth_quantity}', '${cloth_userid}', '${cloth_typeid}', '${cloth_image}');`,
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
  const { id, status } = req.body;
  pool.query(
    `UPDATE users
	SET user_status='${status}'
	WHERE id='${id}'`,
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

router.post("/admin/users/add", async function (req, res) {
  const {
    id,
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
    fileRecv,
    FRONTEND_URL,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(user_password, salt);
  var newpassword = hashPass;
  console.log(
    id,
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
    fileRecv,
    FRONTEND_URL,
    newpassword
  );
  if (parseInt(fileRecv) === 1) {
    const file = req.files.file;
    const filename = Date.now() + "-" + id + "-" + file.name;
    var newpath = "";
    var image_path = "./images";
    newpath = FRONTEND_URL + "/images/avatar/";
    image_path = image_path + "/avatar/" + filename;
    console.log("co file");
    console.log(newpath, image_path);
    pool.query(
      `INSERT INTO users(
	user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_tel, user_status, user_date, user_avatar, user_email)
	VALUES ('${user_typeid}', '${user_username}', '${newpassword}', '${user_firstname}', '${user_lastname}', '${user_address}', '${user_tel}', '${user_status}', '${user_date}', '${image_path}', '${user_email}')`,
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
            user_city: null,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: image_path,
            user_email: user_email,
          });
        }
      }
    );
  } else {
    pool.query(
      `INSERT INTO users(
	user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_tel, user_status, user_date, user_avatar, user_email)
	VALUES ('${user_typeid}', '${user_username}', '${newpassword}', '${user_firstname}', '${user_lastname}', '${user_address}', '${user_tel}', '${user_status}', '${user_date}', '${user_avatar}', '${user_email}')`,
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
            user_city: null,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: user_avatar,
            user_email: user_email,
          });
        }
      }
    );
  }
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
    user_city,
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
    FRONTEND_URL
  );
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
	SET user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_avatar='${image_path}', user_email='${user_email}'
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
            user_city: user_city,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: image_path,
            user_email: user_email,
          });
        }
      }
    );
  } else {
    pool.query(
      `UPDATE users
	SET  user_typeid='${user_typeid}', user_username='${user_username}', user_firstname='${user_firstname}', user_lastname='${user_lastname}', user_address='${user_address}', user_tel='${user_tel}', user_status='${user_status}', user_avatar='${user_avatar}', user_email='${user_email}'
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
            user_city: user_city,
            user_firstname: user_firstname,
            user_lastname: user_lastname,
            user_status: user_status,
            user_typeid: user_typeid,
            user_date: user_date,
            user_avatar: user_avatar,
            user_email: user_email,
          });
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
    console.log("co file");
    console.log(newpath, image_path);
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
            token: token,
          });
        }
      }
    );
  }
});

router.get("/getOrderData.:id", function (req, res) {
  const { id } = req.params;
  if (parseInt(id) === 0) {
    pool.query(
      `SELECT order_details.id, order_details.od_orderid, order_details.od_productid, order_details.od_clothid, order_customername, order_wardid, district.id AS order_districtid, province.id AS order_provinceid, CONCAT(order_customeraddress, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_total, order_paymentid, opm_name, order_shippingid, osm_name, order_tailorid, CONCAT(user_lastname, ' ', user_firstname) AS tailor_name, user_tel as tailor_tel, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_image1, os_name FROM order_details 
              INNER JOIN orders ON orders.id = order_details.od_orderid 
              INNER JOIN products ON products.id = order_details.od_productid
			  INNER JOIN order_status ON order_status.id = orders.order_statusid
			  INNER JOIN order_paymentmethod ON order_paymentmethod.id = orders.order_paymentid
			  INNER JOIN order_shippingmethod ON order_shippingmethod.id = orders.order_shippingid
			  INNER JOIN users ON users.id = orders.order_tailorid
			  INNER JOIN ward ON ward.id = orders.order_wardid
			  INNER JOIN district ON district.id = ward.ward_districtid
			  INNER JOIN province ON province.id = ward.ward_provinceid `,
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
      `SELECT order_details.*, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, opm_name, order_shippingid, osm_name, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_image1, cloth.cloth_name, cloth.cloth_image, cloth.cloth_quantity, cloth.cloth_material, os_name FROM order_details 
              INNER JOIN orders ON orders.id = order_details.od_orderid 
              INNER JOIN products ON products.id = order_details.od_productid
			  INNER JOIN cloth ON cloth.id = order_details.od_clothid
			  INNER JOIN order_status ON order_status.id = orders.order_statusid
			  INNER JOIN order_paymentmethod ON order_paymentmethod.id = orders.order_paymentid
			  INNER JOIN order_shippingmethod ON order_shippingmethod.id = orders.order_shippingid
			  WHERE orders.order_userid = '${id}'`,
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
	id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image)
	VALUES ('${od_clothid}', 'Không rõ', '${cloth_name}', '0', '${order_userid}', 'VCKH', '${image_path}')`,
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
    `SELECT order_details.*, order_customername, order_wardid, CONCAT(order_customeraddress, ', ', ward.ward_prefix, ' ', ward.ward_name, ', ', district.district_prefix, ' ', district.district_name, ', ', province.province_name) AS order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_processingtime1, order_processingtime2, order_processingtime3, order_processingtime4, order_shippingtime, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, opm_name, order_shippingid, order_tailorid, user_firstname as tailor_firstname, user_lastname as tailor_lastname, user_address as tailor_address, user_tel as tailor_tel, osm_name, order_statusid, order_userid, products.product_name, products.product_typeid, products.product_image1, cloth.cloth_name, cloth.cloth_image, cloth.cloth_quantity, cloth.cloth_material, cloth.cloth_typeid, os_name FROM order_details 
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

router.post("/admin/order/processing", function (req, res) {
  const {
    order_statusid,
    order_tailorid,
    date,
    od_orderid,
    cloth_typeid,
    cloth_quantity,
    od_clothid,
  } = req.body;
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
        }
      }
    );
  }
});

router.get("/admin/order/delete.:id", function (req, res) {
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
  const {
    startDate, 
    endDate,
  } = req.body;
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
})

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
})

router.post(`/admin/getCountProductSold`, function (req, res) {
  const { startDate, endDate} = req.body;
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
})

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
order_statusid >= 1 AND order_statusid <5
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
) AS sewing_count,
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
})

router.post(`/admin/getTailorOrder`, function (req, res) {
  const { startDate, endDate } = req.body;
  pool.query(
    `SELECT CONCAT(users.user_lastname, ' ', users.user_firstname) AS name, COUNT(orders.id) AS value 
FROM orders 
INNER JOIN users ON users.id = orders.order_tailorid
WHERE orders.order_tailorid > 1
AND orders.order_statusid = '6' 
AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
GROUP BY name ORDER BY name ASC`,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response.rows);
      }
    }
  );
})

router.post(`/admin/getOrderCount`, function (req, res) {
  const { startDate, endDate, startDateLW, endDateLW } = req.body;
  console.log(startDate, endDate, startDateLW, endDateLW);
  pool.query(
    `SELECT  (
        SELECT COUNT(*)
        FROM   users WHERE user_typeid = 'NV'
        ) AS count_tailor,
        (
        SELECT COUNT(*)
        FROM orders WHERE order_startdate BETWEEN '${startDate}' AND '${endDate}'
        ) AS count_order,
		(
        SELECT COUNT(*)
        FROM orders WHERE order_statusid = '6' AND order_startdate BETWEEN '${startDate}' AND '${endDate}'
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
})

module.exports = router;
