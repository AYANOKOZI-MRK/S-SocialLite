const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  members: { type: Array } // চ্যাটে থাকা দুজন ইউজারের ID [senderId, receiverId]
}, { timestamps: true });

module.exports = mongoose.model("Conversation", ConversationSchema);
