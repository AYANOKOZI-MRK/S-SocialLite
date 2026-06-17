// ==========================================
// ৬. টাইমলাইন ফিড নিয়ে আসা (GET TIMELINE POSTS)
// ==========================================
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId); // নিজের ডাটা আনা
    const userPosts = await Post.find({ userId: currentUser._id }); // নিজের সব পোস্ট
    
    // আমি যাদের ফলো করি তাদের সবার পোস্ট একসাথে খোঁজা
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    
    // নিজের পোস্ট ও বন্ধুদের পোস্ট একসাথে মিশিয়ে ডেট অনুযায়ী সাজানো
    const timelineFeed = userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(timelineFeed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
