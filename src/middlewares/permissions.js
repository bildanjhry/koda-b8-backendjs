import { constants } from "http2"
import libsJwt from "../libs/jwt.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {*import("express").Response} res 
 * @param {function()} next 
 */
export default function permissionsMiddleware(req, res, next){
    try{
        if(req.method === "OPTIONS"){
            return next()
        }
        const permissions = req.data.permissions
        if((permissions & 6) !== 6){
            throw new Error("Forbidden")
        }
        return next()
    } catch(err){
        res.status(constants.HTTP_STATUS_FORBIDDEN).json({
            success:false,
            message: err.message
        })
    }
}