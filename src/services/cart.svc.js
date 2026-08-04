import * as cartRepository from "../repository/cart.repo.js"

export async function findAllCart(params) {
    const res = await cartRepository.findAllCart(params)
    return {
        page: params.page,
        limit: params.limit,
        total: res.length,
        next_page: null,
        prev_page: null,
        data: res
    }
}

export async function findCartDetail(id) {
    const res = await cartRepository.findCartDetail(parseInt(id))
    if(!res){
        throw new Error("Cart not found")
    }
    return res
}

export async function createCart(id_user, data) {
    return await cartRepository.createCart(id_user, data)
}