import { constants } from "http2"
import * as cartServices from "../services/cart.svc.js"
import qs from "qs"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
*/
export async function GetAllCart(req, res) {
    try{
        const queryParams = qs.parse(req.query)
        const response = await cartServices.findAllCart(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All User's Cart",
            ...response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message:err.message
        })
    }
}