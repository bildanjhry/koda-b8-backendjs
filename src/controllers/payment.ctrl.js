import { constants } from "http2"
import * as paymentServices from "../services/payment.svc.js"
import qs from "qs"

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

export async function GetAllPayments(req, res) {
    try{
        const queryParams = qs.parse(req.query)
        const response = await paymentServices.findAllPayment(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all payment method",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}