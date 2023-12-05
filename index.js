import express from 'express'
import bodyParse from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
const app=express()
dotenv.config()

app.use(bodyParse.json({limit:'30mb',extended:true}))
app.use(bodyParse.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use('/posts',postRoutes)
app.use('/users',userRoutes)
const port =process.env.PORT||5000

mongoose.connect(process.env.URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(app.listen(port,()=>{
    console.log(`app runing on ${port}`)
})).catch(err=>err.message);
// mongoose.set('useFindAndModify',false)