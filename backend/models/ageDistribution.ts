import mongoose from 'mongoose';

export interface AgeDistribution{
    name: String,
    value: Number,
    color: String
}

const ageDistributionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true
    }
});

export const AgeDistributionModel = mongoose.model('ageDistribution', ageDistributionSchema);