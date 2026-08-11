import { constants } from "http2"
import * as usersServices from "../services/users.svc.js"
import qs from "qs"
import { default as db } from "../models/index.cjs"
const { users, checkout_histories } = db
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetUsersCheckoutHis(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const response = await usersServices.findUsersCheckoutHis(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            succes: true,
            message: "Succes get all users checkout histories",
            results: response
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: err.message
        })
    }
}

export async function GetUserCheckoutHisById(req, res) {
    try {
        const id_user = req.params.id
        const response = await usersServices.findUsersCheckoutHisByid(id_user)
        res.status(constants.HTTP_STATUS_OK).json({
            succes: true,
            message: "Succes get all users checkout histories",
            results: response
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: err.message
        })
    }
}


export async function GetAllUsers(req, res) {
    try {
        const result = await users.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        const queryParams = qs.parse(req.query)
        const response = await usersServices.findAllUsers(queryParams)
        res.status(constants.HTTP_STATUS_OK).json({
            succes: true,
            message: "Succes get all users",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: err.message
        })
    }
}