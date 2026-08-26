import { constants } from "http2"
import * as profileServices from "../services/profile.svc.js"
import { default as db } from "../models/index.cjs"
const { profile, users, cart } = db

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res  
*/
export async function GetAllProfile(req, res) {
	try {
		const result = await profile.findAll()
		res.status(constants.HTTP_STATUS_OK).json({
			success: true,
			message: "Success get All Profile",
			results: result
		})
	} catch (err) {
		res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
			status: false,
			message: err.message
		})
	}
}

export async function GetProfileDetail(req, res) {
	try {
		const id = req.params.id
		const result = await profile.findOne({
			where: {
				id_user: id
			},

			attributes: [
				"id_user",
				"fullname",
				"username",
				"phone",
				"created_at",
				"updated_at"
			],

			include: [
				{
					association: "id_user_user",
					attributes: ["email"],

					include: [
						{
							model: cart,
							as: "carts",
							attributes: [
								["id", "id_cart"],
								["created_at", "cart_created"],
								["updated_at", "cart_updated"]
							],
							required: false
						}
					]
				}
			]
		})
		res.status(constants.HTTP_STATUS_OK).json({
			success: true,
			message: "Success get profile",
			results: result
		})
	} catch (err) {
		res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
			success: false,
			message: err.message
		})
	}
}

export async function UpdateProfile(req, res) {
	try {
		const id = req.params.id
		const {fullname, username, email, phone} = req.body
		const user = await profile.findByPk(parseInt(id))
		if(!user){
			const err = {}
			err.code = 404
			err.message = "User not found"
			throw err
		}

		if(fullname !== user.fullname){
			user.fullname = fullname
		}

		if(username !== user.username) {
			user.username = username
		}

		if(email !== user.email){
			user.email = email
		}

		if(phone !== user.phone){
			user.phone = phone
		}

		await user.save()

		//await profileServices.updateProfile(id, data)
		res.status(constants.HTTP_STATUS_OK).json({
			success: true,
			message: "Success update profile",
		})
	} catch (err) {
		res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
			success: false,
			message: err.message
		})
	}
}