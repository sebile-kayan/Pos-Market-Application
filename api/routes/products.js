const Product = require("../models/Product.js"); //Product modelini projeye dahil eder.
const express = require("express"); //express modülü,  projeye dahil eder.
const router = express.Router();
 //router, Express.js'in Router sınıfını kullanarak bir router nesnesi oluşturur.Bu router nesnesi, belirli bir URL yolu altında çalışacak olan çeşitli HTTP isteklerini (GET, POST, PUT, DELETE gibi) tanımlamak için kullanılır.


//!BU İŞLEMLER REST API İŞLEMLERİ
router.get("/get-product", async (req, res) => {
  //!ürünü getirme
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-product", async (req, res) => {
  //postman ile kontrol edilebilir
  try {
    const newProduct = new Product(req.body); //!ürüne yeni ürün ekleme
    await newProduct.save(); //yeni kategori nesnesini veritabanına kaydeder
    res.status(200).json("Ekleme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update-product", async (req, res) => {
  //!ürünü güncelleme id'ye göre güncelliyor.
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Güncelleme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete-product", async (req, res) => {
  //!ürünü silme id'ye göre siliyor.
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Silme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
}); 

module.exports = router;
