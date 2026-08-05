import { constants } from "http2"
import * as paymentServices from "../services/payment.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function CreatePayment(req, res){
    try{
        const data = req.body
        const response = await paymentServices.addPayment(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success add new paymnet",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}