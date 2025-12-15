const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    id: {
        type: Number,
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
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: true
    },
    logoUrl: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50
    },
    stadium: {
        type: String,
        required: false,
        maxlength: 100
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
