import * as paymentRepository from "../repository/payment.repo.js"

export async function addPayment(data) {
    const res = await paymentRepository.addPayment(data)
    if(!res){
        throw new Error("Failed add payment")
    }
    return res
}