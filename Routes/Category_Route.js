    const express = require('express');
    const { handleCreateCategory, handleIsOn, handleDeleteCategory, getAllCategory } = require('../Controllers/Category_Controller');

    const router = express.Router();


    router.post('/create', handleCreateCategory);
    router.put('/update/:id', handleIsOn);
    router.delete('/delete/:id', handleDeleteCategory);
    router.get('/all/category', getAllCategory)


    module.exports = router