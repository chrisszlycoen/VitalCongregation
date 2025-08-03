import express from 'express';
import { AttendanceModel } from '../models/attendance';

const router = express.Router();

router.get('/attendance', async (req, res) => {
  try {
    const data = await AttendanceModel.find().sort({ _id: 1 });
    console.log('Attendance data sent:', data);
    res.json(data);
  } catch (err) {
    console.error('Attendance fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/attendance', async (req, res) => {
  try {
    const newData = new AttendanceModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error('Attendance post error:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;