import { constants } from "http2"
import * as sizesServices from "../services/sizes.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("expresss").Response} res  
*/
export async function AddSize(req, res) {
    try{
        const data = req.body
        const response = await sizesServices.addSize(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true, 
            message: "Success Add Size",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetAllSizes(req, res){
    try{
        const response = await sizesServices.getAllSizes()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message:"Success Get All Sizes",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetSizeDetail(req, res) {
    try{
        const id = req.params.id
        const response = await sizesServices.GetSizeDetail(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Size",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}
