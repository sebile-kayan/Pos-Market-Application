const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    img: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  { timestamps: true } //ne zaman oluşturulduğunu bilmek istiyoruz.
);

const Product = mongoose.model("products", ProductSchema); // products adında tablo açacağız ve bu tablo yukarda belirttiğim ProductSchema'nın iskelet yapsını alacak.
module.exports = Product; //export etme işlemi yapıldı.
