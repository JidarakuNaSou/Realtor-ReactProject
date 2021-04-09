const express = require("express");
const users = express.Router();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");
const generatetokens = require("../generateTokens/generatetokens");
const { secret } = require("../config/config").jwt;
const authmiddleware = require("../middleware/authmiddleware");
const Property = require("../models/Property");

const User = require("../models/User");
const Token = require("../models/token");
users.use(cors());

const updateTokens = (user_id) => {
  const accessToken = generatetokens.generateAccessToken(user_id);
  const refreshToken = generatetokens.generateRefreshToken();
  return generatetokens
    .replaceDbRefreshToken(refreshToken.id, user_id)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.tokens,
    }));
};

users.get("/findUserOwerview", (req, res) => {
  User.findOne({ user_id: req.query.user_id }).then((user) => {
    if (user) {
      return res.json(user);
    } else return console.log("there is no such user ");
  });
});

users.get("/finduser", authmiddleware, (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.replace("Bearer ", "");
  const payload = jwt.verify(token, secret);
  User.findOne({ user_id: payload.user_id }).then((user) => {
    if (user) {
      return res.json(user);
    } else return console.log("there is no such user ");
  });
});

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "eu-north-1",
});

const s3 = new aws.S3();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const upload = multer({
  storage: storage
});

users.post("/updateUserInfo", upload.single("file"), (req, res) => {
  User.findOne({ user_id: req.body.user_id }).then((user) => {
    if (user) {
      console.log(req)
      if (!req.file) {
        User.updateOne(
          { user_id: `${req.body.user_id}` },
          {
            first_name: `${req.body.first_name}`,
            last_name: `${req.body.last_name}`,
            phone: `${req.body.phone}`,
          },
          function (err, res) {}
        );

        Property.updateMany(
          { user_id: `${req.body.user_id}` },
          {
            first_name: `${req.body.first_name}`,
            last_name: `${req.body.last_name}`,
            phone: `${req.body.phone}`,
          },
          function (err, res) {}
        );
      } else {
        User.updateOne(
          { user_id: `${req.body.user_id}` },
          {
            first_name: `${req.body.first_name}`,
            last_name: `${req.body.last_name}`,
            phone: `${req.body.phone}`,
            user_image: `/${req.file.destination.slice(9)}/${req.file.filename}`,
          },
          function (err, res) {}
        );

        Property.updateMany(
          { user_id: `${req.body.user_id}` },
          {
            first_name: `${req.body.first_name}`,
            last_name: `${req.body.last_name}`,
            phone: `${req.body.phone}`,
            user_image: `/${req.file.destination.slice(9)}/${req.file.filename}`,
          },
          function (err, res) {}
        );
        return res.send(req.body);
      }
    }
  });
});

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    user_id: uuid(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    user_image: req.body.user_image,
    created: today,
  };
  console.log(req.body);
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + " registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "Пользователь с таким Email уже существует!" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          updateTokens(user.user_id).then((tokens) => {
            console.log(tokens);
            res.json({ tokens, error: null });
          });
        } else {
          res.json({ error: "Логин или пароль неверен" });
        }
      } else {
        res.json({ error: "Логин или пароль неверен" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/propertyStatus", (req, res) => {
  Property.updateOne(
    {
      propertyId: `${req.body.propertyId}`,
    },
    {
      status: `${req.body.propertyStatus}`,
    },
    function (err, res) {}
  );
  return res.send(req.body);
});

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== "refresh") {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Token expired!" });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then((token) => {
      if (token === null) {
        throw new Error("Invalid token!");
      }
      return updateTokens(token.user_id);
    })
    .then((tokens) => res.json(tokens))
    .catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
  users,
  refreshToken,
};
