import { constants } from "http2"
import * as checkoutHisSvc from "../services/checkout_his.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("expresss").Response} res  
*/
export async function GetAllCheckoutHis(req, res){
    try{
        const response = await checkoutHisSvc.findAllCheckoutHis()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message:"Success Get All Checkout Histories",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetCheckoutHisById(req, res){
    try{
        const id = req.params.id
        const response = await checkoutHisSvc.findCheckoutHisById(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message:"Success Get Checkout Histories",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false, 
            message: err.message
        })
    }
}
