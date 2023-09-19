const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlcoholSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  description: { type: String, required: true, minLength: 20, maxLength: 100 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: false },
  fluidvolume: { type: Number, required: true },
  dateopened: { type: Date, required: false }
});

AlcoholSchema.virtual('url').get(function () {
  return `/inventory/alcohol/${this._id}`;
});
