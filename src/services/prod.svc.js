import slugify from "../libs/slugify.js"
import * as prodRepository from "../repository/prod.repo.js"

export async function findAllProd(params){
    const res = await prodRepository.findAllProd(params)
    return {
        page:params.page,
        limit:params.limit,
        total:res.length,
        next_page:null,
        prev_page:null,
        data:res
    }
}

export async function findProdBySlugs(slugs){
    const res = await prodRepository.findProdBySlugs(slugs)
    if(!res){
        throw new Error("Product not found")
    }
    return res
}

export async function createProduct(data, image) {
    data.image = image
    return await prodRepository.createProduct(data)
}

export async function updateProduct(id, data, image) {
    data.image = image
    return await prodRepository.updateProduct(id, data)
}

export async function addRatingProduct(id, id_user, data) {
    data.id_user = id_user
    const res = await prodRepository.addRatingProduct(parseInt(id), data)
    if(!res){
        throw new Error("Product not found")
    }
    return res
}