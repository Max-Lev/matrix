import mongoose from 'mongoose';

export const HeroesSchema = new mongoose.Schema({
    id: String,
    // trainerId: String,
    trainer: String,
    name: String,
    img: String,
    created_at: { type: Date, default: Date.now }

});