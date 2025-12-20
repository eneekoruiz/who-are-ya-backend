//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const leagueSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40000000
    },
    name: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    country: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50
    },
    flagUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.model('League', leagueSchema);
