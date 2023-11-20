import { html } from "../../node_modules/lit-html/lit-html.js"
import { repeat } from "../../node_modules/lit-html/directives/repeat.js"
import { getAllPets } from "../data/pets.js"

const view = (pets) => html`<!--Dashboard-->
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                ${pets.length > 0 ? repeat(pets, p => p._id, p => html`<div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="${p.image}">
                    </article>
                    <h2 class="name">${p.name}</h2>
                    <h3 class="breed">${p.breed}</h3>
                    <div class="action">
                        <a class="btn" href="/dashboard/${p._id}">Details</a>
                    </div>
                </div>`) : html`<!--If there is no pets in dashboard-->
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`}
            </div>
        </section>`

export async function showDashboard(ctx) {
    const pets = await getAllPets()
    ctx.render(view(pets))
}