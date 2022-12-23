const express = require("express");
const app = express();
const DbConnection = require("./config/dbConnection");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config/.env" });
const port = process.env.PORT || 7000;

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

DbConnection();

// inserting default entries to DB
const UserModel = require("./models/userDetails");

// countDocuments method will count the document and call back a function with count value
// so here if doc is empty we insert three users
UserModel.countDocuments({}, (err, count) => {
  if (err) {
    console.log(err);
  } else {
    if (count <= 0) {
      User.insertMany([
        {
          name: "john",
          email: "john@gmail.com",
          phoneNumber: "9478192312",
        },
        {
          name: "Jackie",
          email: "Jackie@gmail.com",
          phoneNumber: "9562319814",
        },
        {
          name: "William",
          email: "William@gmail.com",
          phoneNumber: "9478874239",
        },
      ]);
    }
  }
});

app.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({
    success: true,
    data: users,
    message: "users found",
  });
});

app.post("/addcontact",async (req,res)=>{
  const user = await UserModel(req.body).save();
  res.status(200).send(user);
});

app.delete("/remove/:id",async(req,res)=>{
  const {id}= req.params;
  await UserModel.findByIdAndDelete(id);
});

app.get("/update/:id",async (req,res)=>{
  const {id} = req.params;
  const user = await UserModel.findById(id);
  res.status(200).send(user);
});

app.put("/update/:id",async (req,res)=>{
  const {id} = req.params;
  await UserModel.findByIdAndUpdate(id,req.body);
  const user = await UserModel.findById(id);
  res.status(200).send(user);
});

app.listen(port, () => {
  console.log("server created on port " + port);
});
