import { constants } from "http2"
import qs from "qs"
import * as prodServices from "../services/prod.svc.js"
import { default as db } from "../models/index.cjs"
const {
    products,
    reviews,
    products_variants,
    colors,
    sizes, } = db

import { Op, fn, col, literal } from "sequelize"

export async function GetAllProducts(req, res) {
    try {
        const queryParams = qs.parse(req.query)
        const offset = (parseInt(queryParams.page) * parseInt(queryParams.limit)) - parseInt(queryParams.limit)
        const limit = queryParams.limit
        const result = await products.findAll({
            subQuery: false,

            attributes: [
                "id",
                "title",
                "price",
                "image",
                "alt",
                "slugs",

                [
                    fn("COUNT", col("reviews.id")),
                    "reviews"
                ],

                [
                    fn("COALESCE", fn("AVG", col("reviews.rating")), 0),
                    "rating"
                ]
            ],

            include: [
                {
                    model: reviews,
                    as: "reviews",
                    attributes: [],
                    required: false
                }
            ],

            where: {
                title: {
                    [Op.iLike]: `%${queryParams.search || ""}%`
                }
            },

            group: [
                "products.id",
                "products.title",
                "products.price",
                "products.image",
                "products.alt",
                "products.slugs"
            ],

            limit,
            offset,

        })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Get All data",
            ...result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function GetProductDetails(req, res) {
    try {
        const slugs = req.params.slugs

        const result = await products.findOne({
            subQuery: false,

            attributes: [
                "title",

                [
                    col("products_variants.price"),
                    "price"
                ],

                "created_at",
                "updated_at",
                "slugs",
                "image",
                "alt",

                [
                    fn("SUM", col("products_variants.stocks")),
                    "stocks"
                ],

                [
                    fn("COUNT", col("reviews.id_product")),
                    "reviews"
                ],

                [
                    literal(`COALESCE(AVG("reviews"."rating"), 0)`),
                    "rating"
                ],

                [
                    literal(`
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id', "products_variants->id_color_color"."id",
                        'name', "products_variants->id_color_color"."name",
                        'hex', "products_variants->id_color_color"."hex"
                    )
                )
            `),
                    "avail_colors"
                ],

                [
                    literal(`
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id', "products_variants->id_size_size"."id",
                        'name', "products_variants->id_size_size"."name"
                    )
                )
            `),
                    "avail_sizes"
                ],

                [
                    literal(`
                json_agg(
                    jsonb_build_object(
                        'id', "products_variants"."id_product",
                        'id_variant', "products_variants"."id",
                        'color', "products_variants->id_color_color"."name",
                        'size', "products_variants->id_size_size"."name",
                        'stock', "products_variants"."stocks",
                        'SKU', "products_variants"."sku"
                    )
                )
            `),
                    "items"
                ]
            ],

            include: [
                {
                    model: products_variants,
                    as: "products_variants",
                    attributes: [],
                    required: true,

                    include: [
                        {
                            model: colors,
                            as: "id_color_color",
                            attributes: [],
                            required: true
                        },
                        {
                            model: sizes,
                            as: "id_size_size",
                            attributes: [],
                            required: true
                        }
                    ]
                },

                {
                    model: reviews,
                    as: "reviews",
                    attributes: [],
                    required: false
                }
            ],

            where: {
                slugs
            },

            group: [
                "products.id",
                "products.title",
                "products.created_at",
                "products.updated_at",
                "products.slugs",
                "products.image",
                "products.alt",
                "products_variants.price"
            ],
        })

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success get Product",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function AddProduct(req, res) {
    try {
        const data = req.body
        const imagePath = req?.file?.path || ""
        const response = await prodServices.createProduct(data, imagePath)
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success Add Product",
            results: response
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function UpdateProduct(req, res) {
    try {
        const { title, description, price, alt } = req.body
        const id = req.params.id
        const imagePath = req?.file?.path || ""

        const product = await products.findByPk(parseInt(id))
        if (!product) {
            const err = {}
            err.code = 404
            err.message = "Product not found"
            throw err
        }

        if (title !== product.title) {
            product.title = title
        }

        if (alt !== product.alt) {
            product.alt = alt
        }

        if (description !== product.description) {
            product.description = description
        }

        if (price !== product.price) {
            product.price = price
        }

        if (imagePath !== product.image) {
            product.image = imagePath
        }

        await product.save()

        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success Update Product",
            results: product
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function AddRatingProduct(req, res) {
    try {
        const id = req.params.id
        const id_user = req.data.id
        const { rating, comment } = req.body

        const result = await reviews.create({
            id_product: parseInt(id),
            id_user: parseInt(id_user),
            rating: rating,
            comment: comment
        })

        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success add rating product",
            results: result
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}
