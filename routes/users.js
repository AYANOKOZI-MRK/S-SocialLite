const router = require('express').Router();
const User = require('../models/User');

// ইউজারের প্রোফাইল দেখা (Get User)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) { res.status(500).json(err); }
});

// ফলো করা (Follow User)
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed!");
      } else { res.status(403).json("You already follow this user"); }
    } catch (err) { res.status(500).json(err); }
  } else { res.status(403).json("You cannot follow yourself"); }
});

module.exports = router;
