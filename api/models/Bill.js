const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true }, 
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },//ödemeyöntemi
    cartItems: { type: Array, require: true },//sepetteki ürünler
    subTotal: { type: Number, require: true },//aratoplam
    tax: { type: Number, require: true },//vergi
    totalAmount: { type: Number, require: true },//genelsepettoplamı
  },
  { timestamps: true } //ne zaman oluşturulduğunu bilmek istiyoruz.
);

const Bill = mongoose.model("bills", BillSchema); // categories adında tablo açacağız ve bu tablo yukarda belirttiğim BillSchema'nın iskelet yapsını alacak.
module.exports = Bill; //export etme işlemi yapıldı.
