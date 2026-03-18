import { generateResponse } from "../config/openRouter.js"
import Website from "../models/website.model.js"
import extractJson from "../utils/extractJson.js"

export const getCurrentUser=async (req,res)=>{
    try {
        if(!req.user){
            return res.json({user:null})
        }
        return res.json(req.user)
    } catch (error) {
        return res.status(500).json({message:`get current user error ${error}`})
    }
}


// Website controller mein add karo

// Toggle Public / Private
export const togglePublic = async (req, res) => {
    try {

        
        const { id } = req.params
        

        // id se website find karo — sirf apni website toggle kar sake user
        const website = await Website.findOne({ _id: id, user: req.user._id })

        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }

        // isPublic toggle karo
        website.isPublic = !website.isPublic
        await website.save()

        res.status(200).json({
            message: website.isPublic ? "Website is now public" : "Website is now private",
            isPublic: website.isPublic
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

// Community — sirf isPublic: true wali websites
export const getCommunityWebsites = async (req, res) => {
    try {
        const websites = await Website.find({ isPublic: true })
            .populate('user', 'name avatar')
            .sort({ updatedAt: -1 })

        res.status(200).json(websites)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

// =============================
// CONTROLLER — user.controllers.js mein add karo
// =============================

export const saveCode = async (req, res) => {
    try {
        const { id } = req.params
        const { code } = req.body

        if (!code) {
            return res.status(400).json({ message: "Code is required" })
        }

        const website = await Website.findOne({ _id: id, user: req.user._id })

        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }

        website.latestCode = code
        await website.save()

        res.status(200).json({ message: "Code saved successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}


// =============================
// ROUTE — user.routes.js mein add karo
// =============================

// userRouter.patch("/save-code/:id", isAuth, saveCode)