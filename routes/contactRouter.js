const express= require('express');
const { createContact, deleteContact, getContacts, updateContact, searchContact } = require('../Controller/contactController');
const router= express.Router()
const {upload, cloudinary, storage} = require('../util/cloudinary');


router.post('/createcontact',upload.single('image'),createContact)
router.get('/getcontacts',getContacts)

router.delete('/deletecontact/:id',deleteContact)
router.patch('/updatecontact/:id',updateContact)
router.get('/searchcontact',searchContact)


module.exports=router