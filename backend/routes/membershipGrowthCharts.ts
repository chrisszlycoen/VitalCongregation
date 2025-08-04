import express from 'express';
import { MembershipModel } from '../models/membership';

const router = express.Router();

router.get('/membership', async (req, res) => {
  try {
    const data = await MembershipModel.find().sort({ _id: 1 });
    res.json(data);
  } catch (err) {
    console.error('Membership fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/membership', async (req, res) => {
  try {
    const newData = new MembershipModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error('Membership post error:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;