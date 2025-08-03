import express from 'express';
import { Member } from '../models/member';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Handling GET /api/members');
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Handling POST /api/members', req.body);
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error: any) {
    console.error('Error adding member:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({ error: 'Validation failed', details: errors });
    } else {
      res.status(500).json({ error: 'Failed to add member' });
    }
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    console.log('Handling PATCH /api/members/:id/approve', req.params.id);
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'Active' },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error approving member:', error);
    res.status(500).json({ error: 'Failed to approve member' });
  }
});

router.patch('/:id/reject', async (req, res) => {
  try {
    console.log('Handling PATCH /api/members/:id/reject', req.params.id);
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'Inactive' },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error rejecting member:', error);
    res.status(500).json({ error: 'Failed to reject member' });
  }
});

export default router;