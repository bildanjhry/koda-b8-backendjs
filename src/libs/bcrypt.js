import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

async function hashed(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

async function comparePass(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

const libsBcrypt = {hashed, comparePass}
export default libsBcrypt