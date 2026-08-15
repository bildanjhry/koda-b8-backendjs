import { constants } from "http2"
import * as deliveryServices from "../services/delivery.svc.js"
import qs from "qs"
import { default as db } from "../models/index.cjs"
const { delivery_method } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function CreateDelivery(req, res) {
    try {
        const data = req.body
        const {name, desc} = req.body
        const result = await delivery_method.create({
            name:name,
            desc:desc
        })
        const response = await deliveryServices.addDelivery(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success add new delivery",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetAllDeliveries(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const offset = (parseInt(queryParams.page) * parseInt(queryParams.limit)) - parseInt(queryParams.limit)
        const result = await delivery_method.findAll({
            limit: queryParams.limit,
            offset,
            sort: 'id'
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all delivery method",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}