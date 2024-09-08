const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },// kategori alanında title verisi gerekli veritabanında
  },
  { timestamps: true }//ne zaman oluşturulduğunu bilmek istiyoruz.
);

const Category = mongoose.model("categories",CategorySchema); // categories adında tablo açacağız ve bu tablo yukarda belirttiğim CategorySchema'nın iskelet yapısını alacak.
module.exports=Category;//export etme işlemi yapıldı.
