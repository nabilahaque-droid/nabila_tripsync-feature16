const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    preferredLanguage: { type: String, default: 'en' }
});

module.exports = mongoose.model('User', userSchema);