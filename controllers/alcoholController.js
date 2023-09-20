const Alcohol = require('../models/alcohol');
const AlcoholInstance = require('../models/alcohol_instance');
const Location = require('../models/location');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  const [
    alcohol_count,
    alcohol_instance_count,
    category_count,
    location_count
  ] = await Promise.all([
    Alcohol.countDocuments({}).exec(),
    AlcoholInstance.countDocuments({}).exec(),
    Location.countDocuments({}).exec(),
    Category.countDocuments({}).exec()
  ]);
  res.render('index', {
    title: 'BarKeep',
    alcohol_count: alcohol_count,
    alcohol_instance_count: alcohol_instance_count,
    category_count: category_count,
    location_count: location_count
  });
});

//Display list of all alcohols
exports.alcohol_list = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: alcohol list');
});

// Display detail page for a specific alcohol.
exports.alcohol_detail = asyncHandler(async (req, res, next) => {
  const [alcohol, alcohol_instances] = await Promise.all([
    Alcohol.findById(req.params.id).exec(),
    AlcoholInstance.find({ alcohol: req.params.id }, 'location').exec()
  ]);
  if (alcohol === null) {
    const err = new Error('Author not found');
    err.status = 404;
    return next(err);
  }
  res.render('alcohol_detail', {
    alcohol: alcohol,
    alcohol_instances: alcohol_instances
  });
});

// Display alcohol create form on GET.
exports.alcohol_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol create GET');
});

// Handle alcohol create on POST.
exports.alcohol_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol create POST');
});

// Display alcohol delete form on GET.
exports.alcohol_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol delete GET');
});

// Handle alcohol delete on POST.
exports.alcohol_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol delete POST');
});

// Display alcohol update form on GET.
exports.alcohol_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol update GET');
});

// Handle alcohol update on POST.
exports.alcohol_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcohol update POST');
});
