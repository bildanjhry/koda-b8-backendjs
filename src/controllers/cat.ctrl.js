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

export async function GetAllCategory(req, res){
    try{
        const response = await catServices.getAllCategory()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message:"Success Get All Categories",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false, 
            message: err.message
        })
    }
}

export async function GetCatDetail(req, res) {
    try{
        const id = req.params.id
        const response = await catServices.getCatDetail(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Category",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}