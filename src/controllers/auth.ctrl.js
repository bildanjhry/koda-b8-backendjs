import {constants } from "http2"
import * as authServices from "../services/auth.svc.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function Register(req, res){
    try{
        const data = req.body
        const response = await authServices.createUser(data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success:true,
            message:"Success Create Account",
            results: response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false, 
            message:err.message
        })
    }
}

export async function Login(req, res){
    try{
        const data = req.body
        const response = await authServices.login(data)
        res.status(constants.HTTP_STATUS_OK).json({
            success:true,
            message:"Success Login",
            results:response
        })
    } catch(err){
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success:false,
            message:err.message
        })
    }
}

export async function ForgotPass(req, res){
    try{
      const data = req.body
      const response = await authServices.forgotPass(data)
      res.status(constants.HTTP_STATUS_FOUND).json({
        success: true, 
        message:"Email found"
      })
    } catch(err){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}