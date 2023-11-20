import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../data/users.js"
import { checkForEmptyFields, manageSubmit, setUserData } from "../util.js"

const view = (onSubmit) => html`<!--Register Page-->
        <section id="registerPage">
            <form @submit=${onSubmit} class="registerForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>`

export function showRegister(ctx) {
    ctx.render(view(manageSubmit(onSubmit)))
    async function onSubmit(data) {
        if (checkForEmptyFields(data)) return
        if (data.password != data.repeatPassword) { window.alert('Passwords are not the same!'); return }
        const user = await register(data)
        setUserData(user)
        ctx.page.redirect('/')
    }
}