import { constants } from "http2"
import * as colorsServices from "../services/colors.svc.js"

/**
 * @param {import("express").Request} req
 * @param {import("expresss").Response} res  
*/
export async function AddColor(req, res) {
    try{
        const data = req.body
        const response = await colorsServices.addColor(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true, 
            message: "Success Add Color",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetAllColors(req, res){
    try{
        const response = await colorsServices.getAllColors()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message:"Success Get All Colors",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetColorDetail(req, res) {
    try{
        const id = req.params.id
        const response = await colorsServices.getColorDetail(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Color",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}
