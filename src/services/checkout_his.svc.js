import * as checkoutHisRepository from "../repository/checkout_his.repo.js"

export async function findAllCheckoutHis() {
    return await checkoutHisRepository.findAllCheckoutHis()
}

export async function findCheckoutHisById(id) {
    const res = await checkoutHisRepository.findCheckoutHisById(parseInt(id))
    if(!res){
        throw new Error("Checkout hisotories not found")
    }
    return res
}