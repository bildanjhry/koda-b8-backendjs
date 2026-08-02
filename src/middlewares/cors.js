import { constants } from "http2"

/**
 * 
 * @param {import("expresss").Request} req 
 * @param {import("express").Response} res 
 * @param {function()} next 
 * @returns 
 */
export default function corsMiddleware(req, res, next){
    const URL = process.env.CLIENT_URL 
    res.setHeader("Access-Control-Allow-Origin", URL)
    res.setHeader("Access-Control-Allow-Method", "GET, PATCH, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    if(req.method === "OPTIONS"){
        res.sendStatus(constants.HTTP_STATUS_NO_CONTENT)
        return
    }
    next()
}