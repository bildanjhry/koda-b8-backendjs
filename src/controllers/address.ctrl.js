import { constants } from "http2"
import * as addressServices from "../services/address.svc.js"
import qs from "qs"
import { default as db } from "../models/index.cjs"
const { address } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetAddressByUser(req, res) {
    try{
        const id_user = req.params.id
        const result = await address.findAll({
            where:{
                id_user: parseInt(id_user)
            },
        })
        res.status(constants.HTTP_STATUS_OK).json({
            succes:true,
            message: "Succes get user address",
            results:result
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
        const id = req.data.id
        const {fulladdress, province, city, postcode, optional} = req.body
        const result = await address.create({
            id_user:parseInt(id),
            fulladdress:fulladdress,
            province:province,
            city:city,
            optional:optional
        })
        res.status(constants.HTTP_STATUS_OK).json({
            succes:true,
            message: "Succes add new address",
            results:result
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message:err.message
        })
    }
}