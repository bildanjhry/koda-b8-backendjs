import * as usersRepository from "../repository/users.repo.js"

export async function findUsersCheckoutHis(params){
    return await usersRepository.findUsersCheckoutHis(params)
}

export async function findUsersCheckoutHisByid(id_user){
    return await usersRepository.findUsersCheckoutHisByid(parseInt(id_user))
}

export async function findAllUsers(params) {
    return await usersRepository.findAllUsers(params)
}