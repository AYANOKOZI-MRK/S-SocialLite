const router = require('express').Router();
const User = require('../models/User'); // আপনার User Model এর পাথ
const bcrypt = require('bcryptjs');

// ==========================================
// ১. ইউজার রেজিস্ট্রেশন (REGISTER ROUTE)
// ==========================================
router.post('/register', async (req, res) => {
  try {
    // পাসওয়ার্ড সিকিউর বা হ্যাশ করার জন্য salt জেনারেট করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // নতুন ইউজার অবজেক্ট তৈরি
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // ডাটাবেজে ইউজার সেভ করা
    const user = await newUser.save();
    
    // সিকিউরিটির জন্য রেসপন্স থেকে পাসওয়ার্ড বাদ দিয়ে পাঠানো
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ message: "User registered successfully!", user: otherDetails });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ২. ইউজার লগইন (LOGIN ROUTE)
// ==========================================
router.post('/login', async (req, res) => {
  try {
    // ইমেইল চেক করে ইউজার খোঁজা
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // পাসওয়ার্ড চেক করা
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Wrong password!" });
    }

    // লগইন সফল হলে পাসওয়ার্ড বাদে বাকি ডেটা পাঠানো
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ message: "Login successful!", user: otherDetails });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
