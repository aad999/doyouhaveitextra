const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./config/connectDb')


//config the dot env file

dotenv.config();

connectDb();

const app = express();

app.use(cors())
app.use(express.json())


const PORT = 8080 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})