import mongoose from 'mongoose';

export interface IMember {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Pending' | 'Inactive';
  joinDate: Date;
  department?: string;
}

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Pending' },
  joinDate: { type: Date, required: true },
  department: { type: String },
});

export const Member = mongoose.model('Member', memberSchema);