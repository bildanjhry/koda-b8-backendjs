import * as addressRepository from "../repository/addres.repo.js"

export async function findAddresByUser(id_user){
    const res = await addressRepository.findAddresByUser(parseInt(id_user))
    if(!res){
        throw new Error("Address not found")
    }
    return res
}

export async function addUserAddress(id_user, data) {
    return await addressRepository.createUserAddress(id_user, data)
}