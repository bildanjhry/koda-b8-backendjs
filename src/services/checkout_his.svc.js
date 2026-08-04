import * as checkoutHisRepository from "../repository/checkout_his.repo.js"

export async function findAllCheckoutHis() {
    return await checkoutHisRepository.findAllCheckoutHis()
}