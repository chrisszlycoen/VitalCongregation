import mongoose from 'mongoose';

export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  type: 'Regular' | 'Worship' | 'Study' | 'Prayer';
}

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  attendees: { type: Number, required: true },
  type: { type: String, enum: ['Regular', 'Worship', 'Study', 'Prayer'], required: true },
});

export const Event = mongoose.model('Event', eventSchema);