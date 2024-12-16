const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
   aspect_ratio: { type: Number, required: false },
   height: { type: Number, required: false },
   iso_639_1: { type: String, default: null },
   file_path: { type: String, required: false },
   vote_average: { type: Number, default: 0.0 },
   vote_count: { type: Number, default: 0 },
   width: { type: Number, required: false },
   createdAt: { type: Date, default: Date.now }
});

module.exports = imagesSchema;