const express= require('express')
const app= express();
const connectDB = require('./config/db')
const dotenv=require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');


const contactRoutes=require('./routes/contactRouter')

dotenv.config()
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.send("Api running")
})


app.use('/api',contactRoutes)


app.use(errorHandler)


const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server start on PORT ${PORT}`))
