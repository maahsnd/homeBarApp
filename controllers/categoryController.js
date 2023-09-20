const Category = require('../models/category');
const Alcohol = require('../models/alcohol');
const asyncHandler = require('express-async-handler');

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
  res.send('NOT IMPLEMENTED: category create GET');
});

// Handle category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category create POST');
});

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: category delete GET');
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
