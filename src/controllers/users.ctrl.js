import { constants } from "http2"
import * as usersServices from "../services/users.svc.js"
import qs from "qs"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetUsersCheckoutHis(req, res) {
    try{
        const queryParams = qs.parse(req.query)
        const response = await usersServices.findUsersCheckoutHis(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            succes:true,
            message: "Succes get all users checkout histories",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message:err.message
        })
    }
}