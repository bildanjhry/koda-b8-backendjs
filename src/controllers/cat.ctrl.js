import { constants } from "http2"
import * as catServices from "../services/cat.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("expresss").Response} res  
*/
export async function AddCategory(req, res) {
    try{
        const data = req.body
        const response = await catServices.addCategory(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true, 
            message: "Success Create Category",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}