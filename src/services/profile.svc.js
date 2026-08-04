import * as profileRepository from "../repository/profile.repo.js"

export async function getAllProfile() {
    return await profileRepository.getAllProfile()
}