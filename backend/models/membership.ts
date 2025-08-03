import mongoose from "mongoose";

export interface Membership{
    month: String,
    members: Number
}

const membershipSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true
    }
});

export const MembershipModel = mongoose.model('Membership', membershipSchema);