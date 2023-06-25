const express = require("express")
const cors = require('cors')
const app = express()
const server= require('http').Server(app)
const io = require("socket.io")(server)
 
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/user.router")
const { appointmentRouter } = require("./routes/appointment.route")
const { authenticate } = require("./middlewares/authMiddleware")
const { v4 : uuidV4} = require("uuid")


require("dotenv").config()
const nodemailer = require("nodemailer");

app.set('view engine' , 'ejs')
app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.use("/user",UserRouter)

app.use("/appointments",authenticate,appointmentRouter)

app.get('/video',authenticate, (req, res) => {
    res.redirect(`/video/${uuidV4()}`)
  })
  
  app.get('/video/:room', (req, res) => {
    const {room} = req.params
    res.send({roomId : room})
  })

app.post("/email",authenticate,async(req,res)=>{
    try {
        const {email,url} = req.body;
        //Step 1: Creating the transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
          user: "anuj22rawat20@gmail.com",
          pass: process.env.GOOGLEPass
        }
});

//Step 2: Setting up message options
const messageOptions = {
  subject: "Video Consultation",
  text: `Please join the link :- ${url}`,
  to: email,
  from: "put_email_of_sender"
};

//Step 3: Sending email
transporter.sendMail(messageOptions);
res.send({msg : "Email has been sent to the Doc"})
    }
    catch (err) {
        res.send({ "message": "error" })
    }
}) 

  io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
        socket.on('disconnect', () => {
            socket.emit('user-disconnected', userId)
        })
    })
})

server.listen(process.env.PORT|| 8080 , async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log(`Listening on PORT ${process.env.PORT}`);
    } catch (error) {
        console.log("Error" , error)
    }
})

