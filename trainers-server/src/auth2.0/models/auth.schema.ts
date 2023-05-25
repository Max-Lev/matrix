import mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    email: String,
    accessToken: String
});

export interface Auth extends Document {
    readonly email: string;
    readonly accessToken: string;
}