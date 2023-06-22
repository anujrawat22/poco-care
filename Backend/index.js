const express = require("express")
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/user.router")
require("dotenv").config()
const app = express()

app.use(express.json())

app.use("/user",UserRouter)

app.listen(process.env.PORT|| 8080 , async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log(`Listening on PORT ${process.env.PORT}`);
    } catch (error) {
        console.log("Error" , error)
    }
})