import { constants } from "http2"
import * as authServices from "../services/auth.svc.js"
import { default as db } from "../models/index.cjs"
const { sequelize, users, profile, user_permissions } = db
import libsJwt from "../libs/jwt.js"
import libsBcrypt from "../libs/bcrypt.js"

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
            password: hashedPass
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
        console.log(err)
        await transaction.rollback();
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message: err.message
        })
    }
}

export async function Login(req, res) {
    try {
        const data = req.body
        const response = await authServices.login(data)
        res.status(constants.HTTP_STATUS_OK).json({
            success: true,
            message: "Success Login",
            results: response
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