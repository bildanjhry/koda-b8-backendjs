import * as colorsRepository from "../repository/colors.repo.js"

export async function addColor(data){
    return await colorsRepository.addColor(data)
}

export async function getAllColors() {
    return await colorsRepository.findAllColors()
}

export async function getColorDetail(id) {
    const res = await colorsRepository.findColorDetail(parseInt(id))
    if(!res){
        throw new Error("Color not found")
    }
    return res
}
