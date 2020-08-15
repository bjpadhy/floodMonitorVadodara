const mongoose = require('mongoose');

const levelSchema = {
  id: String,
  server_time: String,
  date: String,
  time: String,
  level: Number
}

const vishwamitriLevelSchema = new mongoose.Schema(levelSchema, { collection: 'vishwamitri_levels' });

const ajwaLevelSchema = new mongoose.Schema(levelSchema, { collection: 'ajwa_levels' });

module.exports = { vishwamitriLevel: mongoose.model('vishwamitriLevels', vishwamitriLevelSchema), ajwaLevel: mongoose.model('ajwaLevelSchema', ajwaLevelSchema) }