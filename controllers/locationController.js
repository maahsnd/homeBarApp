const Location = require('../models/location');
const AlcoholInst = require('../models/alcohol_instance');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//Display list of all locations
exports.location_list = asyncHandler(async (req, res, next) => {
  const allLocations = await Location.find({}).sort({ name: 1 }).exec();
  res.render('location_list', {
    title: 'All Locations',
    location_list: allLocations
  });
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
  res.render('location_form', { title: 'Create new location' });
});

// Handle location create on POST.
exports.location_create_post = [
  body(
    'location_name',
    'Location name required. Must be between 2 and 20 characters'
  )
    .trim()
    .isLength({ min: 2, max: 20 })
    .escape(),
  body('location_description').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const location = new Location({
      name: req.body.location_name,
      description: req.body.location_description
    });
    if (!errors.isEmpty()) {
      res.render('location_form', {
        title: 'Create new location',
        location: location,
        errors: errors.array()
      });
      return;
    } else {
      await location.save();

      res.redirect(location.url);
    }
  })
];

// Display location delete form on GET.
exports.location_delete_get = asyncHandler(async (req, res, next) => {
  const [location, location_bottles] = await Promise.all([
    Location.findById(req.params.id).exec(),
    AlcoholInst.find({ location: req.params.id })
      .populate('alcohol')
      .populate({
        path: 'alcohol',
        populate: {
          path: 'category',
          populate: { path: 'name' }
        }
      })
      .sort({ alcohol: 1 })
      .exec()
  ]);
  res.render('location_delete', {
    location: location,
    location_bottles: location_bottles
  });
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
