import mongoose from 'mongoose';

export const HeroesSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: String,
    // created_at: { type: Date, default: Date.now },
    trainer: String,
    ability: Number,
    startDate: { type: String},
    suit: Number,
    startingPower: Number,
    currentPower: Number,
    trainingCounter: Number
});