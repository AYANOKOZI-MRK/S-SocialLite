const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String }, // চ্যাট রুমের ID
  sender: { type: String },         // যে মেসেজ পাঠিয়েছে তার ID
  text: { type: String }            // মেসেজের লেখা
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
