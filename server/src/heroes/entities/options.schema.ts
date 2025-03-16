import mongoose from 'mongoose';

export const OptionsSchema = new mongoose.Schema({
    id:Number,
    label:String
});

export class OptionsModel {
    id: number;
    label: string;
}

