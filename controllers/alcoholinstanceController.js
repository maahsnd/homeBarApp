const alcohol = require('../models/alcohol');
const { findById } = require('../models/alcohol');
const alcoholInstance = require('../models/alcohol_instance');
const asyncHandler = require('express-async-handler');

//Display list of all alcoholInstances
exports.alcoholInstance_list = asyncHandler(async (req, res, next) => {
  res.send('Not implemented: alcoholInstance list');
});

// Display detail page for a specific alcoholInstance.
exports.alcoholInstance_detail = asyncHandler(async (req, res, next) => {
  const alcohol_inst = await alcoholInstance
    .findById(req.params.id)
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
  res.send('NOT IMPLEMENTED: alcoholInstance create GET');
});

// Handle alcoholInstance create on POST.
exports.alcoholInstance_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcoholInstance create POST');
});

// Display alcoholInstance delete form on GET.
exports.alcoholInstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcoholInstance delete GET');
});

// Handle alcoholInstance delete on POST.
exports.alcoholInstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcoholInstance delete POST');
});

// Display alcoholInstance update form on GET.
exports.alcoholInstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcoholInstance update GET');
});

// Handle alcoholInstance update on POST.
exports.alcoholInstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: alcoholInstance update POST');
});
