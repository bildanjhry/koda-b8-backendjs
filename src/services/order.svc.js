import * as orderRepository from "../repository/order.repo.js"

export async function createOrder(id_user, data) {
    return await orderRepository.createOrder(id_user, data)
}

export async function findAllOrders(id_user, data) {
    return await orderRepository.findAllOrders()
}