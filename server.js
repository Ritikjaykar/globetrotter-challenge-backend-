import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Import CORS
import destinationRoutes from './routes/destinationRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express(); 

app.use(express.json());

// ✅ Use CORS middleware and point it to the frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API routes
app.use('/api/destinations', destinationRoutes); 
app.use('/api/users', userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
