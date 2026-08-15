import { constants } from "http2"
import * as colorsServices from "../services/colors.svc.js"
import { default as db } from "../models/index.cjs"
const { colors } = db

/**
 * @param {import("express").Request} req
 * @param {import("expresss").Response} res  
*/
export async function AddColor(req, res) {
    try {
        const data = req.body
        const { name, hex } = req.body
        const result = await colors.create({
            name: name,
            hex: hex
        }, {
            returning: true
        }
        )
        //const response = await colorsServices.addColor(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success Add Color",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetAllColors(req, res) {
    try {
        const result = await colors.findAll()
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All Colors",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetColorDetail(req, res) {
    try {
        const id = req.params.id
        const result = await findByPk(parseInt(id))
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Color",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}
