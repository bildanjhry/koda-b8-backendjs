import * as prodVarRepository from "../repository/product_var.repo.js"

export async function findAllProdVar(params){
    const res = await prodVarRepository.findAllProdVar(params)
    return {
        page:params.page,
        limit:params.limit,
        total:res.length,
        next_page:null,
        prev_page:null,
        data:res
    }
}

export async function findProdVarById(id){
    const res = await prodVarRepository.findProdVarById(id)
    if(!res){
        throw new Error("Product not found")
    }
}

export async function createProductVar(data, image) {
    data.image = image
    return await prodVarRepository.createProductVar(data)
}