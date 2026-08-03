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
}