const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 20 },
  description: { type: String }
});

LocationSchema.virtual.get(function () {
  return `/inventory/location/${this._id}`;
});

module.exports = mongoose.model('Location', LocationSchema);
