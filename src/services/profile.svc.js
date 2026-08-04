import * as profileRepository from "../repository/profile.repo.js"

export async function getAllProfile() {
    return await profileRepository.getAllProfile()
}

export async function getProfileDetail(id) {
    const res = await profileRepository.getProfileDetail(parseInt(id))
    if (!res) {
        throw new Error("Profile not found")
    }
    return {
        id_user: res.id_user,
        fullname: res.fullname,
        username: res.username,
        phone: res.phone,
        address: res.address_ID,
        created_at: res.created_at,
        updated_at: res.updated_at,
        cart: {
            id: res.id_cart,
            products: res.products_ID,
            create_at: res.cart_created,
            updated_at: res.cart_updated
        }
    }
}