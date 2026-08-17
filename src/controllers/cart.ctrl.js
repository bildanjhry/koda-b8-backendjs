import { constants } from "http2"
import * as cartServices from "../services/cart.svc.js"
import qs from "qs"
import { default as db } from "../models/index.cjs"
const { cart_items, cart, sequelize } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
*/
export async function GetAllCart(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const finalPage = (queryParams.page * queryParams.limit) - queryParams.limit
        const result = await cart.findAll({
            limit: queryParams.limit,
            offset: finalPage
        })

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All User's Cart",
            ...result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetCartDetail(req, res) {
    try {
        const id = req.params.id
        const result = await cart.findByPk(parseInt(id))
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get All User's Cart",
            result: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function CreateCart(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const id_user = req.data.id
        const data = req.body
        let userCart = await cart.findOne({
            where: {
                id_user
            },
            transaction
        });

        if (!userCart) {
            userCart = await cart.create(
                {
                    id_user
                },
                { transaction }
            );
        }

        const item = await cart_items.create(
            {
                id_cart: userCart.id,
                id_product: data.id_product,
                quantity: data.quantity
            },
            { transaction }
        );

        await transaction.commit();
        const dataCart = await cart.findOne({
            where: {
                id_user
            },
            include: [
                {
                    model: cart_items,
                    as: "cart_items"
                }
            ]
        })

        const dataReturn = dataCart?.cart_items.filter(
            (item) => item.id_product === Number(data.id_product)
        )
        // const response = await cartServices.createCart(id_user, data)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success Add to Cart",
            results: dataReturn
        })
    } catch (err) {
        await transaction.rollback();
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetCartItemsDetail(req, res) {
    try {
        const id_cart = req.params.id
        const result = await cart_items.findOne({
            where: {
                id_cart: parseInt(id_cart)
            }
        })
        const response = await cartServices.findCartItemsDetail(id_cart)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Cart Items",
            result: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}


export async function GetCartDetailByUser(req, res) {
    try {
        const id_user = req.params.id_user
        const response = await cartServices.findCartDetailByUser(id_user)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Get Cart Items By User",
            result: response
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            status: "CART_BY_USER",
            message: err.message
        })
    }
}

export async function deleteCartItemById(req, res) {
    try {
        const id = req.params.id
        const result = await cart_items.destroy({
            where: {
                id: parseInt(id)
            }
        })
        if (result < 1) {
            throw new Error("Failed Delete item")
        }

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success delete item",
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function DeleteCartByUser(req, res) {
    try {
        const id = req.params.id
        const response = await cart_items.destroy({
            where: {
                id_cart: parseInt(id)
            }
        })
        if (response < 1) {
            throw new Error("Failed Delete cart")
        }
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success delete cart By User",
            result: response
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            status: "CART_BY_USER",
            message: err.message
        })
    }
}