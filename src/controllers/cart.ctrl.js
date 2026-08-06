import { constants } from "http2"
import * as cartServices from "../services/cart.svc.js"
import qs from "qs"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
*/
export async function GetAllCart(req, res) {
    try{
        const queryParams = qs.parse(req.query)
        const response = await cartServices.findAllCart(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All User's Cart",
            ...response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message:err.message
        })
    }
}

export async function GetCartDetail(req, res) {
    try{
        const id = req.params.id
        const response = await cartServices.findCartDetail(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All User's Cart",
            result:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message:err.message
        })
    }
}

export async function CreateCart(req, res) {
    try{
      const id_user = req.data.id
      const data = req.body
      const response = await cartServices.createCart(id_user, data)
      res.status(constants.HTTP_STATUS_CREATED).json({
        success: true,
        message: "Success Add to Cart",
        results: response
      })
    } catch(err){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetCartItemsDetail(req, res) {
    try{
        const id_cart = req.params.id
        const response = await cartServices.findCartItemsDetail(id_cart)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Cart Items",
            result:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message:err.message
        })
    }
}


export async function GetCartDetailByUser(req, res) {
    try{
        const id_user = req.params.id_user
        const response = await cartServices.findCartDetailByUser(id_user)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Cart Items By User",
            result:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            status:"CART_BY_USER",
            message:err.message
        })
    }
}