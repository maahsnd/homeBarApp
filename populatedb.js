#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Location = require('./models/location');
const Alcohol = require('./models/alcohol');
const AlcoholInstance = require('./models/alcohol_instance');
const Category = require('./models/category');

const alcohols = [];
const alcohol_instances = [];
const categories = [];
const locations = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createLocations();
  await createAlcohols();
  await createAlcoholInstances();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function locationCreate(index, name) {
  const location = new Location({ name: name });
  await location.save();
  locations[index] = location;
  console.log(`Added location: ${name}`);
}

async function categoryCreate(index, name, description) {
  const categoryDetail = {
    name: name
  };
  if (description != false) categoryDetail.description = description;

  const category = new Category(categoryDetail);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${category}`);
}

async function alcoholCreate(
  index,
  name,
  description,
  category,
  provenance,
  price,
  fluid_volume,
  date_opened
) {
  const alcoholdetail = {
    name: name,
    description: description,
    category: category
  };
  if (provenance != false) alcoholdetail.provenance = provenance;

  const alcohol = new Alcohol(alcoholdetail);

  await alcohol.save();
  alcohols[index] = alcohol;
  console.log(`Added alcohol: ${name}`);
}

async function alcoholInstanceCreate(index, alcohol, location) {
  const alcoholInstDetail = {
    alcohol: alcohol,
    location: location
  };
  if (fluid_volume != false) alcoholInstDetail.fluid_volume = fluid_volume;
  if (price != false) alcoholInstDetail.price = price;
  if (date_opened != false) alcoholInstDetail.date_opened = date_opened;

  const alcoholInst = new AlcoholInstance(alcoholInstDetail);
  await alcoholInst.save();
  alcohol_instances[index] = alcoholInst;
  console.log(`Added alcohol instance: ${alcohol} in ${location}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([categoryCreate(0, 'Gin'), categoryCreate(1, 'Whisky')]);
}

async function createLocations() {
  console.log('Adding locations');
  await Promise.all([
    locationCreate(0, 'Nook'),
    locationCreate(1, 'Laundry Room')
  ]);
}

async function createAlcohols() {
  console.log('Adding alcohols');
  await Promise.all([
    alcoholCreate(
      0,
      'Baleia',
      'Named after the Portuguese word for whale, Baleia is distilled overlooking the never-ending Atlantic Ocean on the island of São Miguel. Blending traditional botanicals such as juniper, citrus and rosemary with seaweed sustainably sourced from the waters around the island. Baleia gin has an exceptionally smooth flavour, mixing a touch of sweetness with the salt of the ocean. Brand owner is an ass.',
      categories[0],
      'São Miguel, The Azores Islands, Portugal'
    ),
    alcoholCreate(
      1,
      'Melky Miller',
      '100% corn, produced and aged in the U.S. at least eight years in reused charred American oak cooperage. We hand bottle it right here at the distillery at 90 proof. This medium body whiskey has mature floral and semi-sweet vanilla notes and a finish with hints of honeycomb, caramel corn and mineral notes.',
      categories[1],
      'Philadelphia, Pennsylvania, U.S.A.'
    )
  ]);
}

async function createAlcoholInstances() {
  console.log('Adding alcohol instances');
  await Promise.all([
    alcoholInstanceCreate(0, alcohols[0], locations[0]),
    alcoholInstanceCreate(1, alcohols[1], locations[0])
  ]);
}
