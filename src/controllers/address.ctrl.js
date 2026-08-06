import { constants } from "http2"
import * as addressServices from "../services/address.svc.js"
import qs from "qs"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetAddressByUser(req, res) {
    try{
        const id_user = req.params.id
        const response = await addressServices.findAddresByUser(id_user)
        res.status(constants.HTTP_STATUS_OK).json({
            succes:true,
            message: "Succes get user address",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message:err.message
        })
    }
}

export async function CreateAddress(req, res) {
    try{
        const id = req.params.id_user
        const data = req.body
        const response = await addressServices.findAddresByUser(id_user)
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