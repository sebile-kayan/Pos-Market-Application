const Bill = require("../models/Bill.js"); 
const express = require("express"); 
const router = express.Router(); 


//!BU İŞLEMLER REST API İŞLEMLERİ
router.get("/get-bill", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-bill", async (req, res) => {
  //postman ile kontrol edilebilir
  try {
    const newBill = new Bill(req.body); 
    await newBill.save(); //yeni kategori nesnesini veritabanına kaydeder
    res.status(200).json("Ekleme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
