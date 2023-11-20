import { get, post, put, del } from "./api.js"

const endpoints = {
    'pets': 'data/pets'
}

export const getAllPets = async () => await get(endpoints.pets + '?sortBy=_createdOn%20desc&distinct=name')

export const getPetById = async id => await get(endpoints.pets + `/${id}`)

export const postPet = async pet => await post(endpoints.pets, pet)

export const putPet = async (pet, id) => await put(endpoints.pets + `/${id}`, pet)

export const delPet = async id => await del(endpoints.pets + `/${id}`)