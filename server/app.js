const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const uuid = require("uuid/v4");
const multerS3 = require("multer-s3");
const Property = require("./models/Property");
const app = express();
const path = require ('path');
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static("../public"));
app.use(express.static("../build"));

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb+srv://Admin-Yar:poker998cklub@cluster0.t2hym.mongodb.net/3drealtor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const Users = require("./routers/Users");

app.use("/users", Users.users);
app.use("/refresh-tokens", Users.refreshToken);

aws.config.update({
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
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
 
var upload = multer({ storage: storage })


app.post("/upload-property", upload.array("files[]", 10), (req, res) => {
  if (req.body === null && req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const today = new Date();
  const propertyData = {
    propertyId: uuid(),
    typeProperty: req.body.typeProperty,
    Street: req.body.Street,
    House: req.body.House,
    Apartaments: req.body.Apartaments,
    fulladdres: `${req.body.Street} ${req.body.House} ${req.body.Apartaments}`,
    countApartment: req.body.countApartment,
    Space: req.body.Space,
    Place: req.body.Place,
    Title: req.body.Title,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    user_image: req.body.user_image,
    phone: req.body.phone,
    sketch3D: req.body.sketch3D,
    video: req.body.video,
    uploadedFile: req.files,
    user_id: req.body.user_id,
    status: "Продается",
    created: today,
  };
  Property.create(propertyData);
  return res.send("lol");
});
app.get("/getProperty", (req, res) => {
  Property.find({propertyId:req.query.propertyId}).then((resdata)=>{
    if(resdata){
      return res.send(resdata);
    }
  })
})

app.get("/getUserPropertys", (req, res) => {
  Property.find({user_id:req.query.user_id}).then((resdata)=>{
    if(resdata){
      console.log(resdata)
      return res.send(resdata);
    }
  })
})

app.get("/getPropertys", (req, res) => {
  if (req.query.propertyType == "Прочее") {
    Property.find({
      typeProperty: {
        $in: ["Торговое помещение", "Складское помещение", "Готовый бизнес"],
      },
    }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else if (req.query.propertyType == "Офис") {
    Property.find({ typeProperty: "Офисное помещение" }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else if (req.query.propertyType == "Дом") {
    Property.find({
      typeProperty: { $in: ["Дом", "Часть Дома", "Таунхаус", "Дуплекс"] },
    }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else
    Property.find({ typeProperty: req.query.propertyType }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/../build"));
  app.use(express.static(__dirname + "/../public"));

  app.get("/*", function root(req, res) {
    res.sendFile(path.resolve(__dirname + "/../build" + '/index.html'));
  });
}

app.listen(PORT, () => {
  return console.log("Server has been started...");
});
