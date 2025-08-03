import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRoutes from './routes/member';
import eventRoutes from './routes/events';
import dashboardRoutes from './routes/dashboard';
import attendanceRoutes from './routes/attendanceChart';
import ageDistributionRoutes from './routes/ageDistributionChart';
import membershipRoutes from './routes/membershipGrowthCharts';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', ageDistributionRoutes);
app.use('/api', membershipRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vital-congregation-connect')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));