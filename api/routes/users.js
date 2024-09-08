const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//get all user tüm kullanıcıların bilgilerini getirme
router.get("/get-all-user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a user  bir kullanıcının bilgisini getirme
router.get("/get-a-user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
