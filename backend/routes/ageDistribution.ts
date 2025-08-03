import express from 'express';
import { AgeDistributionModel } from '../models/ageDistribution';

const router = express.Router();

router.get('/api/age-distribution', async (req, res) => {
  try {
    const data = await AgeDistributionModel.find().sort({ _id: 1 });
    console.log('Age distribution data sent:', data);
    res.json(data);
  } catch (err) {
    console.error('Age distribution fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/api/age-distribution', async (req, res) => {
  try {
    const newData = new AgeDistributionModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error('Age distribution post error:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;