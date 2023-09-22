const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AlcoholInstSchema = new Schema({
  alcohol: { type: Schema.Types.ObjectId, ref: 'Alcohol' },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  date_opened: { type: Date, required: false },
  fluid_volume: { type: Number, required: false },
  price: { type: Number, required: false }
});

AlcoholInstSchema.virtual('url').get(function () {
  return `/inventory/alcoholinst/${this._id}`;
});

AlcoholInstSchema.virtual('date_yyyy').get(function () {
  const date = DateTime.fromJSDate(this.date_opened).toISODate();
  const formattedDate = DateTime.fromISO(date).plus({ days: 1 }).toISODate();
  return formattedDate;
});

AlcoholInstSchema.virtual('formatted_date').get(function () {
  const date = DateTime.fromJSDate(this.date_opened).toISODate();
  const formattedDate = DateTime.fromISO(date)
    .plus({ days: 1 })
    .toLocaleString(DateTime.DATE_MED);
  return formattedDate;
});

module.exports = mongoose.model('AlcoholInstance', AlcoholInstSchema);
