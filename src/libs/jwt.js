import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_KEY || "quantumentanglement"

function sign(payload){
    return jwt.sign(payload, SECRET_KEY)
}

function verify(payload){
    return jwt.verify(payload, SECRET_KEY)
}

const libsJwt = {sign, verify}
export default libsJwt