import { Schema, model } from 'mongoose';

const d4_todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default model('d4_TodoTask', d4_todoSchema);
