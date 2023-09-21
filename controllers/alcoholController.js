const Alcohol = require('../models/alcohol');
const AlcoholInstance = require('../models/alcohol_instance');
const Location = require('../models/location');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  const allAlcohols = await Alcohol.find({}, 'name category')
    .sort({ name: 1 })
    .populate('category')
    .exec();
  res.render('alcohol_list', {
    title: 'Alcohol list',
    alcohol_list: allAlcohols
  });
});

// Display detail page for a specific alcohol.
exports.alcohol_detail = asyncHandler(async (req, res, next) => {
  const [alcohol, alcohol_instances] = await Promise.all([
    Alcohol.findById(req.params.id).populate('category').exec(),
    AlcoholInstance.find({ alcohol: req.params.id }, 'location')
      .populate('location')
      .exec()
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
  const allCategories = await Category.find({}, 'name')
    .sort({ name: 1 })
    .exec();
  res.render('alcohol_form', {
    title: 'Create new alcohol',
    categories: allCategories
  });
});

// Handle alcohol create on POST.
exports.alcohol_create_post = [
  (req, res, next) => {
    if (!(req.body.alcohol_category instanceof Array)) {
      if (typeof req.body.alcohol_category === 'undefined')
        req.body.alcohol_category = [];
      else req.body.alcohol_category = new Array(req.body.alcohol_category);
    }
    next();
  },

  body('alcohol_name', 'Name required, must be between length 2 and 30')
    .trim()
    .isLength({ min: 2, max: 30 })
    .escape(),
  body(
    'alcohol_description',
    'Description required, must be between length 20 and 500'
  )
    .trim()
    .isLength({ min: 20, max: 500 })
    .escape(),
  body('alcohol_category', 'Category required').escape(),
  body('alcohol_provenance').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const alcohol = new Alcohol({
      name: req.body.alcohol_name,
      description: req.body.alcohol_description,
      category: req.body.alcohol_category,
      provenance: req.body.alcohol_provenance
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().exec();
      res.render('alcohol_form', {
        title: 'Create alcohol',
        categories: allCategories,
        alcohol: alcohol,
        errors: errors.array()
      });
      return;
    } else {
      await alcohol.save();

      res.redirect(alcohol.url);
    }
  })
];

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
