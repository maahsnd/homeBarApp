const Category = require('../models/category');
const Alcohol = require('../models/alcohol');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//Display list of all categorys
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'All categories',
    category_list: allCategories
  });
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const alcoholsInCategory = await Alcohol.find(
    { category: req.params.id },
    'name'
  ).sort({ name: 1 });
  res.render('category_detail', {
    category: category,
    category_alcohols: alcoholsInCategory
  });
});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create new category' });
});

// Handle category create on POST.
exports.category_create_post = [
  body(
    'category_name',
    'Category name required. Must be between 2 and 30 characters'
  )
    .trim()
    .isLength({ min: 2, max: 30 })
    .escape(),
  body('category_description').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.category_name,
      description: req.body.category_description
    });
    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create new category',
        category: category,
        errors: errors.array()
      });
      return;
    } else {
      await category.save();

      res.redirect(category.url);
    }
  })
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category_alcohols, category] = await Promise.all([
    Alcohol.find({ category: req.params.id }).sort({ name: 1 }).exec(),
    Category.findById(req.params.id).exec()
  ]);
  res.render('category_delete', {
    category_alcohols: category_alcohols,
    category: category
  });
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category delete POST');
});

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category update GET');
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category update POST');
});
