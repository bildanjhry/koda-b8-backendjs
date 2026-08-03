import { constants } from "http2"

import * as prodServices from "../services/prod.svc.js"

export async function GetAllProducts(req, res) {
    try {
        const params = {
            page:1,
            limit:5
        }
        const response = await prodServices.findAllProd(params)
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
            resulst:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}