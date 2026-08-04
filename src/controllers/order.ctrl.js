import { constants } from "http2"
import * as orderRepository from "../repository/order.repo.js"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
*/
export async function CreateOrder(req, res) {
    try{
        const id_user = req.data.id
        const data = req.body
        const response = await orderRepository.createOrder(id_user, data)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success create order",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:err.message
        })
    }
}

export async function GetAllOrder(req, res) {
    try{
        const response = await orderRepository.findAllOrders()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get all orders",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:err.message
        })
    }
}