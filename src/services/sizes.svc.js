import * as sizesRepository from "../repository/sizes.repo.js"

export async function addSize(data){
    return await sizesRepository.addSize(data)
}

export async function getAllSizes() {
    return await sizesRepository.findAllSizes()
}

export async function getSizesDetail(id) {
    const res = await sizesRepository.findSizesDetail(parseInt(id))
    if(!res){
        throw new Error("Size not found")
    }
    return res
}
