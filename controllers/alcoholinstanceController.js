const Alcohol = require('../models/alcohol');
const Location = require('../models/location');
const { findById } = require('../models/alcohol');
const AlcoholInstance = require('../models/alcohol_instance');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

//Display list of all alcoholInstances
exports.alcoholInstance_list = asyncHandler(async (req, res, next) => {
  const allBottles = await AlcoholInstance.find({}, 'alcohol')
    .populate('alcohol')
    .populate({
      path: 'alcohol',
      populate: {
        path: 'category',
        populate: { path: 'name' }
      }
    });
  res.render('alcoholinst_list', {
    title: 'All Bottles',
    alcohol_list: allBottles
  });
});

// Display detail page for a specific alcoholInstance.
exports.alcoholInstance_detail = asyncHandler(async (req, res, next) => {
  const alcohol_inst = await AlcoholInstance.findById(req.params.id)
    .populate('alcohol location')
    .populate({
      path: 'alcohol',
      populate: {
        path: 'category',
        populate: { path: 'name' }
      }
    })
    .exec();
  res.render('alcoholinst_detail', { alcoholinst: alcohol_inst });
});

// Display alcoholInstance create form on GET.
exports.alcoholInstance_create_get = asyncHandler(async (req, res, next) => {
  const [allAlcohols, allLocations] = await Promise.all([
    Alcohol.find({}, 'name').sort({ name: 1 }).exec(),
    Location.find({}, 'name').sort({ name: 1 }).exec()
  ]);
  res.render('alcoholinst_form', {
    title: 'Create new acohol instance (bottle)',
    locations: allLocations,
    all_alcohols: allAlcohols
  });
});

// Handle alcoholInstance create on POST.
exports.alcoholInstance_create_post = [
  //location to array
  (req, res, next) => {
    if (!(req.body.location instanceof Array)) {
      if (typeof req.body.location === 'undefined') req.body.location = [];
      else req.body.location = new Array(req.body.location);
    }
    next();
  },
  //alcohol to array
  (req, res, next) => {
    if (!(req.body.alcohol instanceof Array)) {
      if (typeof req.body.alcohol === 'undefined') req.body.alcohol = [];
      else req.body.alcohol = new Array(req.body.alcohol);
    }
    next();
  },
  body('alcohol.*').escape(),
  body('location.*').escape(),
  body('date_opened', 'Date invalid')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('fluid_volume').trim().escape(),
  body('price').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const alcoholInst = new AlcoholInstance({
      alcohol: req.body.alcohol,
      location: req.body.location,
      date_opened: req.body.date_opened,
      fluid_volume: req.body.fluid_volume,
      price: req.body.price
    });

    if (!errors.isEmpty()) {
      const [allLocations, allAlcohols] = await Promise.all([
        Location.find({}, 'name').sort({ name: 1 }).exec(),
        Alcohol.find({}, 'name').sort({ name: 1 }).exec()
      ]);
      res.render('alcoholinst_form', {
        title: 'Create new acohol instance (bottle)',
        locations: allLocations,
        all_alcohols: allAlcohols,
        selected_alcohol: alcoholInst
      });
      return;
    } else {
      await alcoholInst.save();

      res.redirect(alcoholInst.url);
    }
  })
];

// Display alcoholInstance delete form on GET.
exports.alcoholInstance_delete_get = asyncHandler(async (req, res, next) => {
  const alcoholInst = await AlcoholInstance.findById(req.params.id)
    .populate('alcohol')
    .populate({
      path: 'alcohol',
      populate: {
        path: 'category',
        populate: { path: 'name' }
      }
    })
    .exec();
  res.render('alcoholinst_delete', { alcoholinst: alcoholInst });
});

// Handle alcoholInstance delete on POST.
exports.alcoholInstance_delete_post = asyncHandler(async (req, res, next) => {
  const alcoholInst = await AlcoholInstance.findById(req.params.id)
    .populate('alcohol')
    .exec();
  await AlcoholInstance.findByIdAndRemove(req.params.id);
  res.redirect(alcoholInst.alcohol.url);
});

// Display alcoholInstance update form on GET.
exports.alcoholInstance_update_get = asyncHandler(async (req, res, next) => {
  const [all_alcohols, alcohol_inst, locations] = await Promise.all([
    Alcohol.find({}, 'name').sort({ name: 1 }).exec(),
    AlcoholInstance.findById(req.params.id)
      .populate('alcohol')
      .populate('location')
      .exec(),
    Location.find({}, 'name').sort({ name: 1 }).exec()
  ]);

  res.render('alcoholinst_form', {
    title: 'Update alcohol instance (bottle)',
    all_alcohols: all_alcohols,
    alcohol_inst: alcohol_inst,
    formatted_date: alcohol_inst.date_yyyy,
    locations: locations
  });
});

// Handle alcoholInstance update on POST.
exports.alcoholInstance_update_post = [
  body('alcohol', 'Alcohol required').escape('alcohol.*'),
  body('location', 'Location required').escape('location.*'),
  body('date_opened').optional({ values: 'falsy' }).isISO8601().toDate(),
  body('fluid_volume').optional({ values: 'falsy' }).trim().escape(),
  body('price').optional({ values: 'falsy' }).trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedAlcoholInst = new AlcoholInstance({
      alcohol: req.body.alcohol,
      location: req.body.location,
      date_opened: req.body.date_opened,
      fluid_volume: req.body.fluid_volume,
      price: req.body.price,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      const [all_alcohols, locations] = await Promise.all([
        Alcohol.find({}, 'name').sort({ name: 1 }).exec(),
        Location.find({}, 'name').sort({ name: 1 }).exec()
      ]);

      res.render('alcoholinst_form', {
        title: 'Update alcohol instance (bottle)',
        all_alcohols: all_alcohols,
        alcohol_inst: updatedAlcoholInst,
        formatted_date: alcohol_inst.date_yyyy,
        locations: locations,
        errors: errors.array()
      });
      return;
    } else {
      await AlcoholInstance.findByIdAndUpdate(
        req.params.id,
        updatedAlcoholInst,
        {}
      );

      res.redirect(updatedAlcoholInst.url);
    }
  })
];
