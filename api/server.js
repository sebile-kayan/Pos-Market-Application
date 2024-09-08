const express = require("express");
const mongoose = require("mongoose"); //mongoDB ile express.js bağlantısı kurar mongoose
const dotenv=require("dotenv")
const app = express();
const cors=require("cors");
const logger = require('morgan');
const port = 5000;

//routes category çağırma 1.adım
const categoryRoute=require("./routes/categories.js")
//routes product çağırma 1.adım
const productRoute=require("./routes/products.js")
//routes bill çağırma 1.adım
const billRoute=require("./routes/bills.js")
//auth register 1.adım
const authRoute=require("./routes/auth.js")
//user get 1.adım
const userRoute=require("./routes/users.js")


dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect( process.env.MONGO_URI); //MONGODB İLE BAĞLANTI KURDUK.
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

//middlewares kullanıldı
app.use(logger("dev"))
app.use(express.json());
app.use(cors())

//routes category çağırma 2.adım
app.use("/api/categories",categoryRoute);
//routes product çağırma 2.adım
app.use("/api/products",productRoute);
//routes bill çağırma 2.adım
app.use("/api/bills",billRoute);
//auth register 2.adım
app.use("/api/auth",authRoute);
//user get 2.adım
app.use("/api/users",userRoute);


app.listen(port, () => {
  connect();
  //sunucu dinleme işlemi yapılıyor ve işlem gerçekleşirse consoleda yazdırılacak.
  console.log(`example app listening on port ${port}`);
});


