const router = require('express').Router();
const Conversation = require('../models/Conversation');

// নতুন চ্যাট রুম তৈরি (Create Conversation)
router.post('/', async (req, res) => {
  const newConversation = new Conversation({ members: [req.body.senderId, req.body.receiverId] });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) { res.status(500).json(err); }
});

// ইউজারের চ্যাট লিস্ট আনা (Get User's Conversations)
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({ members: { $in: [req.params.userId] } });
    res.status(200).json(conversation);
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;
