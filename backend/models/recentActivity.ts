import mongoose from "mongoose";

export interface RecentActivity {
    type: string;
    description: string;
    timestamp: Date;
}

const recentActivitySchema = new mongoose.Schema({
    type: { type: String, required: true},
    description: { type: String, required: true},
    timestamp: { type: Date, required: true},
});

export const RecentActivityModel = mongoose.model('RecentActivity', recentActivitySchema);