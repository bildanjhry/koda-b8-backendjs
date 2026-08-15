import { constants } from "http2"
import * as paymentServices from "../services/payment.svc.js"
import qs from "qs"
import { default as db } from "../models/index.cjs"
const { payment_method } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function CreatePayment(req, res) {
    try {
        const { name, desc } = req.body
        const result = await payment_method.create({
            name:name,
            desc:desc
        })
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success add new payment",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetAllPayments(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const offset = (parseInt(queryParams.page) * parseInt(queryParams.limit)) - parseInt(queryParams.limit)
        const result = await payment_method.findAll({
            limit: queryParams.limit,
            offset,
            sort: 'id'
        })
        const response = await paymentServices.findAllPayment(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all payment method",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}