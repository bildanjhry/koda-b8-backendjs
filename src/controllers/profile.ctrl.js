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