import * as catRepository from "../repository/cat.repo.js"

export async function addCategory(data){
    return await catRepository.addCategory(data)
}

export async function getAllCategory() {
    return await catRepository.findAllCat()
}

export async function getCatDetail(id) {
    const res = await catRepository.findCatDetail(parseInt(id))
    if(!res){
        throw new Error("Category not found")
    }
    return res
}