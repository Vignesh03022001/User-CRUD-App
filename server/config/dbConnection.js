const mongoose = require("mongoose");

function DbConnection() {
  // console.log(process.env.MONGODB_URL);
  mongoose.set("strictQuery", true);

  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

module.exports = DbConnection;
