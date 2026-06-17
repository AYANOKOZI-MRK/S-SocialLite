const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // কোন ইউজার পোস্ট করেছে তার ID
  desc: { type: String, max: 500 },         // পোস্টের টেক্সট বা ক্যাপশন
  img: { type: String, default: "" },       // ছবির ইউআরএল (যদি থাকে)
  likes: { type: Array, default: [] }       // লাইক দেওয়া ইউজারদের আইডি জমা থাকবে
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
