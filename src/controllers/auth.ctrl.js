import { constants } from "http2"
import * as authServices from "../services/auth.svc.js"
import { default as db } from "../models/index.cjs"
const { sequelize, users, profile, user_permissions } = db
import libsJwt from "../libs/jwt.js"
import libsBcrypt from "../libs/bcrypt.js"
import argon2 from "argon2"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export async function Register(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { email, password, fullname } = req.body
        const hashedPass = await libsBcrypt.hashed(password)
        const user = await users.create({
            email: email,
            password: password
        },
            { transaction }
        )

        await profile.create(
            {
                id_user: user.id,
                fullname: fullname,
                username: "dovesfeather",
            },
            { transaction }
        )

        await user_permissions.create(
            {
                id_user: user.id,
                status: 1,
            },
            { transaction }
        )

        await transaction.commit();

        const results = {
            id: user.id,
            created_at: user.createdAt,
        }
        res.status(constants.HTTP_STATUS_CREATED).json({
            success: true,
            message: "Success Create Account",
            results: results
        })
    } catch (err) {
        await transaction.rollback();
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function Login(req, res) {
    try {
        const {email, password} = req.body
        // const response = await authServices.login(data)
        const result = await users.findOne({
            where: {
                email: email
            },

            attributes: [
                "id",
                "password"
            ],

            include: [
                {
                    association: "user_permissions",
                    attributes: [
                        ["status", "permissions"]
                    ],
                    required: true
                }
            ]
        });

        if (!result) {
            throw new Error("User not found")
        }

        const response = {
            id: result.id,
            password: result.password,
            permissions: result.user_permissions?.[0]?.get("permissions")
        }
        if (response?.permissions & 6) {
            const token = libsJwt.sign({ id: response.id, permissions: response.permissions })
            res.status(constants.HTTP_STATUS_OK).json({
                success: true,
                message: "Success Login",
                results: {
                    id: response.id,
                    token: token,
                    per: response.permissions * 2
                }
            })
            return
        }

      //  const isMatch = await libsBcrypt.comparePass(data.password, response.password)
        const isPassMatch = await argon2.verify(result.password, password)
        if (!isPassMatch) {
            throw new Error("User not found")
        }
        const token = libsJwt.sign({ id: response.id, permissions: response.permissions })
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Login",
            results: {
                id: response.id,
                token: token,
                per: response.permissions * 2
            }
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: err.message
        })
    }
}

export async function ForgotPass(req, res) {
    try {
        const data = req.body
        const response = await authServices.forgotPass(data)
        res.status(constants.HTTP_STATUS_FOUND).json({
            success: true,
            message: "Email found"
        })
    } catch (err) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}