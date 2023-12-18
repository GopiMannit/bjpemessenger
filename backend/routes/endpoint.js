const express = require('express')
const {
    postRegister,
    check,
    postSummary,
    getSummary,
    getUser,
    getProfile,
    updateProfile,
    forgotpassword,
    getReport,
    whatsApp,
    postUser    
} = require('../controller/crudController')
const router = express.Router()
router.post('/register',postRegister);
router.post('/check',check);
router.post('/summaries',postSummary);
router.post('/user',getUser);
router.post('/whatsapp',whatsApp);
router.post('/postuser',postUser);
router.get('/summary',getSummary);
router.get('/profile/:user',getProfile);
router.get('/report/:fromdate/:todate',getReport);
router.patch('/patchprofile/:user',updateProfile)
router.patch('/forgotpassword/:user',forgotpassword)
module.exports = router
