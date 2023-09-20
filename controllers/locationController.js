const Location = require('../models/location');
const AlcoholInst = require('../models/alcohol_instance');
const asyncHandler = require('express-async-handler');

//Display list of all locations
exports.location_list = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: location list');
});

// Display detail page for a specific location.
exports.location_detail = asyncHandler(async (req, res, next) => {
  const selectedLocation = await Location.findById(req.params.id).exec();
  const locationInventory = await AlcoholInst.find({
    location: req.params.id
  })
    .populate({
      path: 'alcohol',
      populate: { path: 'name' }
    })
    .populate({
      path: 'alcohol',
      populate: {
        path: 'category',
        populate: { path: 'name' }
      }
    })
    .exec();
  res.render('location_detail', {
    location: selectedLocation,
    location_alcohols: locationInventory
  });
});

// Display location create form on GET.
exports.location_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location create GET');
});

// Handle location create on POST.
exports.location_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location create POST');
});

// Display location delete form on GET.
exports.location_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location delete GET');
});

// Handle location delete on POST.
exports.location_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location delete POST');
});

// Display location update form on GET.
exports.location_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location update GET');
});

// Handle location update on POST.
exports.location_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: location update POST');
});
