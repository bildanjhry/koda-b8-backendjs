import { constants } from "http2"
import qs from "qs"
import * as prodVarServices from "../services/product_var.svc.js"

export async function GetAllProductsVar(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const response = await prodVarServices.findAllProdVar(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message: "Get All data",
            ...response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message:err.message
        })
    }
}

export async function GetProductVarDetails(req, res) {
    try{
        const slugs = req.params.slugs
        const response = await prodVarServices.findProdVarById(id)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message: "Success get Product",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}

export async function AddProductVar(req, res) {
    try{
        const data = req.body
        const response = await prodVarServices.createProductVar(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true, 
            message:"Success Add Product",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}
