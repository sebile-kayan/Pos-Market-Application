const Category = require("../models/Category.js"); //Category modelini projeye dahil eder.
const express = require("express"); //express modülü,  projeye dahil eder.
const router = express.Router(); //router, Express.js'in Router sınıfını kullanarak bir router nesnesi oluşturur.Bu router nesnesi, belirli bir URL yolu altında çalışacak olan çeşitli HTTP isteklerini (GET, POST, PUT, DELETE gibi) tanımlamak için kullanılır.


//!BU İŞLEMLER REST API İŞLEMLERİ
router.get("/get-category", async (req, res) => {
  //!kategori getirme
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-category", async (req, res) => {
  //postman ile kontrol edilebilir
  try {
    const newCategory = new Category(req.body); //!kategoriye yeni kategori ekleme
    await newCategory.save(); //yeni kategori nesnesini veritabanına kaydeder
    res.status(200).json("Ekleme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
});//Bu rota, bir POST isteği ile gönderilen verilerle yeni bir kategori oluşturur ve bunu veritabanına kaydeder. Eğer bir hata oluşursa, istemciye hata mesajı gönderilir.

router.put("/update-category", async (req, res) => {
  //!kategoriyi güncelleme id'ye göre güncelliyor.
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Güncelleme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete-category", async (req, res) => {
  //!kategoriyi silme id'ye göre siliyor.
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Silme Başarılı!");
  } catch (error) {
    res.status(500).json(error);
  }
}); 

module.exports = router;
