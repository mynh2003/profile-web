const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require('./routes/contactRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');


const app = express();
connectDB(); // Kết nối DB

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/LeBinhMinh', profileRoutes);
app.use('/LeBinhMinh', contactRoutes);
app.use('/LeBinhMinh', skillRoutes);
app.use('/LeBinhMinh', projectRoutes);
app.use('/LeBinhMinh', testimonialRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
