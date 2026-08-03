import { constants } from "http2"
import libsJwt from "../libs/jwt"

/**
 * 
 * @param {import("express").Request} req 
 * @param {*import("express").Response} res 
 * @param {function()} next 
 * @returns 
 */
export default function authMiddleware(req, res, next){
    try{
        if(req.method === "OPTIONS"){
            return next()
        }
        const auth = req.header("Authorization") || ""
        if(auth.startsWith("Bearer ")){
            const token = auth.split(" ")[1]
            const data = libsJwt.verify(token)
            req.data = data
            return next()
        }

    } catch(err){
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success:false,
            message:"Unauthorized"
        })
    }
}