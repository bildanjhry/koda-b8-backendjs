import { constants } from "http2"
import * as deliveryServices from "../services/delivery.svc.js"
import qs from "qs"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function CreateDelivery(req, res){
    try{
        const data = req.body
        const response = await deliveryServices.addDelivery(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success add new delivery",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetAllDeliveries(req, res) {
    try{
        const queryParams = qs.parse(req.query)
        const response = await deliveryServices.findAllDeliveries(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all delivery method",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}