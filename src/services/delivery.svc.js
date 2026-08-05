import * as deliveryRepository from "../repository/delivery.repo.js"

export async function addDelivery(data) {
    const res = await deliveryRepository.addDelivery(data)
    if(!res){
        throw new Error("Failed add delivery")
    }
    return res
}
export async function findAllDeliveries(params) {
    return await deliveryRepository.findAllDeliveries(params)
}