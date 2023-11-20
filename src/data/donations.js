import { post, get } from "./api.js"

const endpoints = {
    'donations': 'data/donation'
}

export const postDonation = petId => post(endpoints.donations, { petId })

export const getPetTotalDonations = petId => get(endpoints.donations + `?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)

export const getUserDonationsForPet = (petId, userId) => get(endpoints.donations + `?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)