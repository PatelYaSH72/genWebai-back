import express from "express"
import {  getCommunityWebsites, getCurrentUser, saveCode, togglePublic } from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"


const userRouter=express.Router()

userRouter.get("/get-sites",isAuth,getCommunityWebsites)
userRouter.patch("/toggle-public/:id",isAuth,togglePublic)
userRouter.get("/me",isAuth,getCurrentUser)
userRouter.patch("/save-code/:id", isAuth, saveCode)


export default userRouter