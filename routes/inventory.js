const express = require('express');
const router = express.Router();

const alcohol_controller = require('../controllers/alcoholController');
const alcohol_inst_controller = require('../controllers/alcoholinstanceController');
const category_controller = require('../controllers/categoryController');
const location_controller = require('../controllers/locationController');

/* ALCOHOL ROUTES */

// GET inventory home page. //
router.get('/', alcohol_controller.index);

//GET Alcohol create
router.get('/alcohol/create', alcohol_controller.alcohol_create_get);

//POST Alcohol create
router.post('/alcohol/create', alcohol_controller.alcohol_create_post);

//GET Alcohol delete
router.get('/alcohol/:id/delete', alcohol_controller.alcohol_delete_get);

//POST Alcohol delete
router.post('/alcohol/:id/delete', alcohol_controller.alcohol_delete_post);

//GET Alcohol update
router.get('/alcohol/:id/update', alcohol_controller.alcohol_update_get);

//POST Alcohol update
router.post('/alcohol/:id/update', alcohol_controller.alcohol_update_post);

//GET Alcohol specific
router.get('/alcohol/:id', alcohol_controller.alcohol_detail);

//GET Alcohol all
router.get('/alcohol', alcohol_controller.alcohol_list);

/* ALCOHOL INSTANCE ROUTES */

//GET Alcohol Instance create
router.get(
  '/alcoholinst/create',
  alcohol_inst_controller.alcoholInstance_create_get
);

//POST Alcohol Instance create
router.post(
  '/alcoholinst/create',
  alcohol_inst_controller.alcoholInstance_create_post
);

//GET Alcohol Instance delete
router.get(
  '/alcoholinst/:id/delete',
  alcohol_inst_controller.alcoholInstance_delete_get
);
//POST Alcohol Instance delete
router.post(
  '/alcoholinst/:id/delete',
  alcohol_inst_controller.alcoholInstance_delete_post
);
//GET Alcohol Instance update
router.get(
  '/alcoholinst/:id/update',
  alcohol_inst_controller.alcoholInstance_update_get
);
//POST Alcohol Instance update
router.post(
  '/alcoholinst/:id/update',
  alcohol_inst_controller.alcoholInstance_update_post
);
//GET Alcohol Instance specific
router.get('/alcoholinst/:id', alcohol_inst_controller.alcoholInstance_detail);
//GET Alcohol Instance all
router.get('/alcoholinst', alcohol_inst_controller.alcoholInstance_list);

/* CATEGORY ROUTES */

//GET Category create
router.get('/category/create', category_controller.category_create_get);

//POST Category create
router.post('/category/create', category_controller.category_create_post);

//GET Category delete
router.get('/category/:id/delete', category_controller.category_delete_get);

//POST Category delete
router.post('/category/:id/delete', category_controller.category_delete_post);

//GET Category update
router.get('/category/:id/update', category_controller.category_update_get);

//POST Category update
router.post('/category/:id/update', category_controller.category_update_post);

//GET Category specific
router.get('/category/:id', category_controller.category_detail);

//GET Category all
router.get('/category', category_controller.category_list);

/* LOCATION ROUTES */

//GET Location create
router.get('/location/create', location_controller.location_create_get);

//POST Location create
router.post('/location/create', location_controller.location_create_post);

//GET Location delete
router.get('/location/:id/delete', location_controller.location_delete_get);

//POST Location delete
router.post('/location/:id/delete', location_controller.location_delete_post);

//GET Location update
router.get('/location/:id/update', location_controller.location_update_get);

//POST Location update
router.post('/location/:id/update', location_controller.location_update_post);

//GET Location specific
router.get('/location/:id', location_controller.location_detail);

//GET Location all
router.get('/location', location_controller.location_list);

module.exports = router;
