const asynchandler=require('express-async-handler')
const {Contact}=require('../model/contactModel')
const {upload, cloudinary, storage} = require('../util/cloudinary');

//create contact

const createContact=asynchandler(async(req,res)=>{
    const {name,number}=req.body;
//   console.log(req.body);
    if(!name || !number){
        res.status(400)
        throw new Error("Please enter all field")
    }


   
    const contactImage = req.file ? req.file.path : null;

 // check it exist
    const contactExist=await Contact.findOne({name})
    if(contactExist){
        res.status(400)
        throw new Error("Already Exist")
    }

    const numberExist=await Contact.findOne({number})
    // console.log("nu",numberExist);
    numberExist?.number.forEach((value)=>{
        if(value){
            res.status(400)
            throw new Error("Already Existss")
        }
    })


    // create

    const contact=await Contact.create({
        name,
        number,
        image:contactImage
    })

    if(contact){
        res.status(201).json({
            _id:contact.id,
            name:contact.name,
            number:contact.number,
            image:contact.contactImage
        })
    }else{
        res.status(400)
        throw new Error("Invalid Error")
    }
})








//get all contacts


const getContacts=asynchandler(async(req,res)=>{

    try {
        const contacts=await Contact.find({})
        res.status(200).json(contacts)
    } catch (error) {
        res.status(400)
        throw new Error("Error get when getting contacts")
        
    }
    
})


//update contact

const updateContact=asynchandler(async(req,res)=>{
     const Id=req.params.id
    const contact=await Contact.findById(Id)
    if(contact){
        const newContact={
            name:req.body.name,
            number:req.body.number
        }
        // console.log("new",newContact);
        const updatecontact=await Contact.findByIdAndUpdate(Id,
            newContact,{new:true})
        // console.log("up",updatecontact);
        res.status(200).json(updatecontact)
    }else{
        res.status(400)
        throw new Error("Course not found")
    }
})


//delete contact

const deleteContact=asynchandler(async(req,res)=>{
    const Id=req.params.id
    // console.log("Id",Id);
    const contact=await Contact.findById(Id)

    if(contact){
        const deletecontact=await contact.remove()
        res.status(200).json({
            contactId:deletecontact._id
        })
    }else{
        res.status(400)
        throw new Error("Contact is not found")
    }
})



// search contact

const searchContact=asynchandler(async(req,res)=>{

    const searchfield=req.query.name;
    console.log("jj",searchfield);
    if(!searchfield){
        req.status(400)
        throw new Error('contact is not fonud')
    }else{
        const searchcontact=await Contact.find({name:{$regex:searchfield,$options:'i'}})
        res.status(200).json(searchcontact)
    }
})



module.exports={
    createContact,
    deleteContact,
    getContacts,
    updateContact,
    searchContact
}