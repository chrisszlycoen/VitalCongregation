import express from 'express';
import { Event } from '../models/event';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Handling GET /api/events');
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Handling POST /api/events', req.body);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error: any) {
    console.error('Error adding event:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({ error: 'Validation failed', details: errors });
    } else {
      res.status(500).json({ error: 'Failed to add event' });
    }
  }
});

export default router;