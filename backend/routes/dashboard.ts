import express from 'express';
import { Member } from '../models/member';
import { Event } from '../models/event';
import { AttendanceModel } from '../models/attendance';

const router = express.Router();

router.get('/api/avg-attendance', async (req, res) => {
  try {
    const attendanceData = await AttendanceModel.find().sort({ _id: 1 });
    const avg = attendanceData.reduce((sum, item) => sum + item.attendance, 0) / attendanceData.length || 0;
    const trend = { value: 5, isPositive: true }; // Placeholder trend
    res.json({ value: avg.toString(), trend });
  } catch (err) {
    console.error('Avg attendance fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/recent-activity', async (req, res) => {
  try {
    const members = await Member.find().sort({ _id: -1 }).limit(2);
    const events = await Event.find().sort({ date: -1 }).limit(2);
    const activities = [
      ...members.map(m => ({ type: 'member', description: `Added ${m.name}`, timestamp: new Date() })),
      ...events.map(e => ({ type: 'event', description: `Scheduled ${e.title}`, timestamp: e.date })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);
    res.json(activities);
  } catch (err) {
    console.error('Recent activity fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;