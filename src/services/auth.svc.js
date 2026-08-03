import libsBcrypt from "../libs/bcrypt.js"
import libsJwt from "../libs/jwt.js"
import * as authRepository from "../repository/auth.repo.js"

export async function createUser(data){
    data.password = await libsBcrypt.hashed(data.password)
    const response = await authRepository.createUser(data)
    return response
}

export async function login(data) {
    const response = await authRepository.login(data)
    if(response.length < 1){
        throw new Error("User not found")
    }
    const isMatch = await libsBcrypt.comparePass(data.password, response.password)
    if(!isMatch){
        throw new Error("User not found")
    }
    const token = libsJwt.sign({id: response.id})
    return {
        id:response.id,
        token:token
    }
}

export async function forgotPass(data){
    const response = await authRepository.forgotPass(data)
    if(!response){
        throw new Error("User not found")
    }
}