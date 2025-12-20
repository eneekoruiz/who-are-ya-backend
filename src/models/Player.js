//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const playerSchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 1,
        max: 40000000,
        required: true
    },
    name: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    birthDate: {
        type: Date,
        required: false
    },
    nationality: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: true
    },
    position: {
        type: String,
        enum: ['GK', 'DF', 'MF', 'FW'],
        required: false
    },
    number: {
        type: Number,
        min: 1,
        max: 99,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.model('Player', playerSchema);
