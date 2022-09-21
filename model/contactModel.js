const mongoose=require('mongoose')


const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add name']
    },
    number:[{
        type:String,
        required:[true,"Please add number"],
        // unique:true
    }],
    image:{
        type:String,
        // required:[true]
    }

})


const Contact=mongoose.model("Contact",contactSchema)
module.exports={Contact}