import { Schema, model } from 'mongoose';

export const NameSapce = model('namespace', new Schema({
    hookid: {
        type: String,
        required: true,
        unique: true
    },
    handler: {
        type: String,
        required: true,
        unique: true
    }
}))
