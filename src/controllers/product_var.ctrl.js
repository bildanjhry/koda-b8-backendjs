import { constants } from "http2"
import qs from "qs"
import * as prodVarServices from "../services/product_var.svc.js"
import { default as db } from "../models/index.cjs"
const { products_variants } = db

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
        const id = req.params.id
        // const response = await prodVarServices.findProdVarById(id)
        const result = await products_variants.findByPk(parseInt(id))
        res.status(constants.HTTP_STATUS_OK).json({
            success: true, 
            message: "Success get Product",
            results:result
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
        const {
            id_product, 
            id_color, 
            id_size, 
            stocks, 
            price, 
            sku} = req.body

       // const response = await prodVarServices.createProductVar(data)

        const result = await products_variants.create({
            id_product:id_product,
            id_color:id_color,
            id_size:id_size,
            stocks:stocks,
            price:price,
            sku:sku
        })
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true, 
            message:"Success Add Product",
            results: result
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false, 
            message: err.message
        })
    }
}
