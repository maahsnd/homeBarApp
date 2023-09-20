const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlcoholInstSchema = new Schema({
  alcohol: { type: Schema.Types.ObjectId, ref: 'Alcohol' },
  location: { type: Schema.Types.ObjectId, ref: 'Location' }
});

AlcoholInstSchema.virtual('url').get(function () {
  return `/inventory/alcoholinst/${this._id}`;
});

module.exports = mongoose.model('AlcoholInstance', AlcoholInstSchema);
