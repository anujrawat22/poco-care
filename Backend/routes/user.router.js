const express = require("express")
const { register, login, UserData, doctors, user, updateUser } = require("../controller/user")
const { authenticate } = require("../middlewares/authMiddleware")


const UserRouter = express.Router()



UserRouter.post("/register",register)

UserRouter.post("/login",login)

UserRouter.get("/data",authenticate,UserData)

UserRouter.get("/doctors",authenticate,doctors)

UserRouter.get("/userData/:id" ,authenticate,user)

UserRouter.patch("/update",authenticate,updateUser)
module.exports = {UserRouter}