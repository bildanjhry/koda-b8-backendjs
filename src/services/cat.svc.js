import * as catRepository from "../repository/cat.repo.js"

export async function addCategory(data){
    return await catRepository.addCategory(data)
}

export async function getAllCategory() {
    return await catRepository.findAllCat()
}