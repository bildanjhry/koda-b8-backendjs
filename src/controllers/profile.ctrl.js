import { constants } from "http2"
import * as profileServices from "../services/profile.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetAllProfile(req, res) {
    try{
        const response = await profileServices.getAllProfile()
        res.status(constants.HTTP_STATUS_OK).json({
            success:true, 
            message:"Success get All Profile",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            status: false, 
            message: err.message
        })
    }
}

export async function GetProfileDetail(req, res) {
    try{
        const id = req.params.id
        const response = await profileServices.getProfileDetail(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get profile",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message:err.message
        })
    }
}


export async function UpdateProfile(req, res) {
    try{
        const id = req.params.id
        const data = req.body
        const response = await profileServices.updateProfile(id, data)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success update profile",
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message:err.message
        })
    }
}