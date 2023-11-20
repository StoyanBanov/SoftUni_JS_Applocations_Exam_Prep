import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getPetTotalDonations, getUserDonationsForPet, postDonation } from "../data/donations.js";
import { delPet, getPetById } from "../data/pets.js";

const view = (pet, donations, userDonations, userId, onClick) => html` <!--Details Page-->
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations}$</h4>
                    </div>
                    ${userId ? html`<!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        ${userId == pet._ownerId
            ? html`<!-- Only for registered user and creator of the pets-->
                        <a href="/dashboard/edit/${pet._id}" class="edit">Edit</a>
                        <a @click=${onClick} href="#" class="remove">Delete</a>`
            : userDonations == 0 ? html`<!--(Bonus Part) Only for no creator and user-->
                        <a @click=${onClick} href="#" class="donate">Donate</a>` : ''}
                    </div>`: nothing}
                </div>
            </div>
        </section>`

export async function showDetails(ctx) {
    const userId = ctx.user._id
    const petId = ctx.params.id
    const [pet, donations] = await Promise.all([getPetById(petId), getPetTotalDonations(petId)])
    let userDonations
    if (userId && userId != pet._ownerId) {
        userDonations = await getUserDonationsForPet(petId, userId)
    }
    ctx.render(view(pet, Number(donations) * 100, userDonations, userId, onClick))
    async function onClick(e) {
        e.preventDefault()
        if (e.target.className == 'remove') {
            if (confirm('Are you sure you want to delete?')) {
                await delPet(petId)
                ctx.page.redirect('/')
            }
        } else if (e.target.className == 'donate') {
            await postDonation(petId)
            ctx.render(view(pet, Number(donations) * 100 + 100, 1, userId, onClick))
        }
    }
}