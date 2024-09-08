const User = require("../models/User.js");
const router = require("express").Router(); // bills.js'teki 2.ve 3. satır tek satırda da yapılabiliyor böyle
const bcrypt = require("bcryptjs");

//!register(kayıt olma) işlemi ve parola hash işlemi
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    //Her şifreye eklenen salt, aynı şifrelerin farklı hash'lerle saklanmasını sağlar. Bu, hash'lenmiş şifrelerin karşılaştırılmasını zorlaştırır.
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword, //parolaları hashledik.
    });
    await newUser.save();
    res.status(200).json("Yeni Kullanıcı Oluşturuldu!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//!login(giriş) işlemi ve parola hash işlemi
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });//Bu satır, gelen istekteki (req.body) email adresine sahip kullanıcıyı MongoDB veritabanından bulmaya çalışır. User.findOne yöntemi, belirtilen e-posta adresine sahip ilk kullanıcıyı döndürür.
    if (!user) {
      return res.status(404).send({ error: "Kullanıcı Bulunamadı!" });
    } //kullanıcı değilse sunucu 404  hatası verir
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );//Kullanıcı bulunduysa, bu satır gelen şifreyi (req.body.password) kullanıcının veritabanındaki hashlenmiş şifresi (user.password) ile karşılaştırır.
    if (!validPassword) {
      res.status(403).json("Geçersiz Şifre!");
    } else {
      res.status(200).json(user); //geçerli ise kullanıcıyı yazdırır.
    }
  } catch (error) {
    res.status(500).json(error);
  }//auth.js'te veritabanı tarafında uyarı hata mesajları verdirdik hata olursa diye ama Login ve Register.jsx'te de frontend için uyarı mesajları verilmeli
});

module.exports = router;
