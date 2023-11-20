import { html } from "../../node_modules/lit-html/lit-html.js"
import { getPetById, putPet } from "../data/pets.js"
import { checkForEmptyFields, manageSubmit } from "../util.js"

const view = (pet, onSubmit) => html`<!--Edit Page-->
        <section id="editPage">
            <form @submit=${onSubmit} class="editForm">
                <img src=${pet.image}>
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value="${pet.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value="${pet.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`

export async function showEdit(ctx) {
    const pet = await getPetById(ctx.params.id)
    ctx.render(view(pet, manageSubmit(onSubmit)))
    async function onSubmit(data) {
        if (checkForEmptyFields(data)) return
        await putPet(data, pet._id)
        ctx.page.redirect(`/dashboard/${pet._id}`)
    }
}