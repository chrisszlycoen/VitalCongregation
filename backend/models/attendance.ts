import mongoose from 'mongoose';

export interface Attendance {
  month: string;
  attendance: number;
}

const attendanceSchema = new mongoose.Schema({
  month: { type: String, required: true },
  attendance: { type: Number, required: true },
});

export const AttendanceModel = mongoose.model('Attendance', attendanceSchema);