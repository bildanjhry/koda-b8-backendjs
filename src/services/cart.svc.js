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