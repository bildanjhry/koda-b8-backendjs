import { constants } from "http2"
import * as orderRepository from "../repository/order.repo.js"
import { default as db} from "../models/index.cjs"
const { order_status } = db

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

export async function GetAllOrderStatus(req, res) {
    try{
        const result = await order_status.findAll()
        res.status(constants.HTTP_STATUS_OK).json({
            success:true,
            message:"Success Get all order status",
            results:result
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success:false,
            message:err.message
        })
    }
}

export async function CreateOrderStatus(req, res) {
    try{
        const { name } = req.body
        const result = await order_status.create({
            name:name
        })
        res.status(constants.HTTP_STATUS_OK).json({
            success:true,
            message:"Success add order status",
            results:result
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success:false,
            message:err.message
        })
    }
}