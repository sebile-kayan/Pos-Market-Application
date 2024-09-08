const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }//ne zaman oluşturulduğunu bilmek istiyoruz.
);

const User = mongoose.model("users",UserSchema); // categories adında tablo açacağız ve bu tablo yukarda belirttiğim UserSchema'nın iskelet yapsını alacak.
module.exports=User;//export etme işlemi yapıldı.