import { constants } from "http2"
import qs from "qs"
import * as prodServices from "../services/prod.svc.js"

export async function GetAllProducts(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const response = await prodServices.findAllProd(queryParams)
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

export async function GetProductDetails(req, res) {
    try{
        const slugs = req.params.slugs
        const response = await prodServices.findProdBySlugs(slugs)
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

export async function AddProduct(req, res) {
    try{
        const data = req.body
        const response = prodServices.createProduct(data)
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