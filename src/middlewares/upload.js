import multer from "multer";
import slugify from "../libs/slugify.js";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const title = req.body.title
        const fileExt = file.mimetype.split("/")[1]
        const filename = slugify(req.body.title, req.data.id)
        cb(null, filename + "." + fileExt)
    }
})

export default function uploadMiddleware(fieldName) {
    const upload = multer({
        storage: storage,
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: function (req, file, cb) {
            const fileExt = file.mimetype.split("/")[1]
            if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg') {
                return cb(new Error("Wrong type"));
            } else {
                cb(null, true)
            }
        }
    }).single(fieldName)
    return function (req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    messsage: err.messsage
                })
                return
            }
            next()
        })
    }
}