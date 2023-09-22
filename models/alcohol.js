const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlcoholSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  description: { type: String, required: true, minLength: 20, maxLength: 500 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  provenance: { type: String, required: false, minLength: 5, maxLength: 60 }
});

AlcoholSchema.virtual('url').get(function () {
  return `/inventory/alcohol/${this._id}`;
});

module.exports = mongoose.model('Alcohol', AlcoholSchema);
