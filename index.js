const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// রাউট ইমপোর্ট
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

// ডাটাবেজ কানেকশন
const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL;
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully to Cloud!"))
  .catch((err) => console.log("❌ DB Error: ", err.message));

// মিডলওয়্যার
app.use(express.json());
app.use(cors());

// রাউট সেটআপ
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

