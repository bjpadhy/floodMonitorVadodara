const mongoose = require('mongoose');

const vishwamitriLevelSchema = new mongoose.Schema({
  id: String,
  server_time: String,
  date: String,
  time: String,
  level: Number
}, { collection: 'vishwamitri_levels' });

const ajwaLevelSchema = new mongoose.Schema({
  id: String,
  server_time: String,
  date: String,
  time: String,
  level: Number
}, { collection: 'ajwa_levels' });

module.exports = {vishwamitriLevel: mongoose.model('vishwamitriLevels', vishwamitriLevelSchema), ajwaLevel: mongoose.model('ajwaLevelSchema', ajwaLevelSchema)}