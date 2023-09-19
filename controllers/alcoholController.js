const Alcohol = require('../models/alcohol');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: Home page');
});
//Display list of all alcohols
exports.alcohol_list = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: alcohol list');
});

// Display detail page for a specific alcohol.
exports.alcohol_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: alcohol detail: ${req.params.id}`);
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
