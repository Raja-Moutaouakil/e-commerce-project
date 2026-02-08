require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const db= process.env.MONGO_URI;
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
