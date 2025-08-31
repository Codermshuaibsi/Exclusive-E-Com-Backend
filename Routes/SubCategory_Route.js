const express = require('express');
const router = express.Router();
const { createSubcategory, getSubcategories, getSubcategoriesByCategory, updateSubcategory, deleteSubcategory } 
= require('../Controllers/SubCategory_Controller.js');

// CRUD routes
router.post('/create', createSubcategory);
router.get('/getallsubcategory', getSubcategories);
router.get('/category/:categoryId', getSubcategoriesByCategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;
