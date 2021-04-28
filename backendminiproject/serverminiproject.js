const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 80;
app.use(cors());
const passport = require("passport");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const jwt = require("jsonwebtoken");

// all of our routes will be prefixed with /api

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));



let vegetations = {
  list: [
    { id: 1, name: "rose", price: 50 },
    { id: 2, name: "ruk", price: 40 },
  ],
};

let vegetationsbuy = {
    listbuy:[
        {id:1,name:"Chaowvarin",lastname:"Suksed",address:"123456",city:"nakhon",state:"noppitom",num: 5}
    ]
}

router
.route("/buy")
.get((req, res) => res.json(vegetationsbuy))
.post((req,res)=>{
    console.log(req.body)
    let newvegetationsbuy = {};
    newvegetationsbuy.id=vegetationsbuy.listbuy.length
    ? vegetationsbuy.listbuy[vegetationsbuy.listbuy.length - 1].id+1 :1;
    newvegetationsbuy.name=req.body.name;
    newvegetationsbuy.lastname=req.body.lastname;
    newvegetationsbuy.address=req.body.address;
    newvegetationsbuy.city=req.body.city;
    newvegetationsbuy.state=req.body.state;
    newvegetationsbuy.num=req.body.num;
    vegetationsbuy ={listbuy:[...vegetationsbuy.listbuy,newvegetationsbuy]};
});
router
  .route("/vegetationbuy/:vegetationbuy_id")
  .get((req, res) => {
    const vegetationbuy_id = req.params.vegetationbuy_id;
    const id = vegetationsbuy.listbuy.findIndex(
      (item) => +item.id === +vegetationbuy_id
    );
    res.json(vegetationsbuy.listbuy[id]);
  })
  .put((req, res) => {
    const vegetationbuy_id = req.params.vegetationbuy_id;
    const id = vegetationsbuy.listbuy.findIndex(
      (item) => +item.id === +vegetationbuy_id
    );
    vegetationsbuy.listbuy[id].name = req.body.name;
    vegetationsbuy.listbuy[id].lastname = req.body.lastname;
    vegetationsbuy.listbuy[id].address = req.body.address;
    vegetationsbuy.listbuy[id].city = req.body.city;
    vegetationsbuy.listbuy[id].state = req.body.state;
    vegetationsbuy.listbuy[id].num = req.body.num;
    res.json(vegetationsbuy);
  })

  .delete((req, res) => {
    const vegetationbuy_id = req.params.vegetationbuy_id;
    console.log("vegetation_id: ", vegetationbuy_id);
    vegetationsbuy.listbuy = vegetationsbuy.listbuy.filter(
      (item) => +item.id !== +vegetationbuy_id
    );
    res.json(vegetationsbuy);
  });


router
  .route("/vegetation")
  .get((req, res) => res.json(vegetations))
  .post((req, res) => {
    console.log(req.body);
    let newVegetation = {};
    newVegetation.id = vegetations.list.length
      ? vegetations.list[vegetations.list.length - 1].id + 1
      : 1;
    newVegetation.name = req.body.name;
    newVegetation.price = req.body.price;
    vegetations = { list: [...vegetations.list, newVegetation] };
    res.json(vegetations);
  });

router
  .route("/vegetation/:vegetation_id")
  .get((req, res) => {
    const vegetation_id = req.params.vegetation_id;
    const id = vegetations.list.findIndex(
      (item) => +item.id === +vegetation_id
    );
    res.json(vegetations.list[id]);
  })
  .put((req, res) => {
    const vegetation_id = req.params.vegetation_id;
    const id = vegetations.list.findIndex(
      (item) => +item.id === +vegetation_id
    );
    vegetations.list[id].name = req.body.name;
    vegetations.list[id].price = req.body.price;
    res.json(vegetations);
  })

  .delete((req, res) => {
    const vegetation_id = req.params.vegetation_id;
    console.log("vegetation_id: ", vegetation_id);
    vegetations.list = vegetations.list.filter(
      (item) => +item.id !== +vegetation_id
    );
    res.json(vegetations);
  });

app.use("*", (req, res) => res.status(404).send("404 Not found"));
app.listen(port, () => console.log(`Server is running on port ${port}`));
