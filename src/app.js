import page from "../node_modules/page/page.mjs"
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { getUserData, removeUserData } from "./util.js"
import { showHome } from "./views/home.js"
import { logout } from "./data/users.js"
import { showLogin } from "./views/login.js"
import { showRegister } from "./views/register.js"
import { showDashboard } from "./views/dashboard.js"
import { showCreate } from "./views/create.js"
import { showDetails } from "./views/details.js"
import { showEdit } from "./views/edit.js"

const main = document.getElementById('content')
const nav = document.querySelector('nav')

const navView = (userId) => html`
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <!--Users and Guest-->
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                ${userId ? html`<!--Only Users-->
                <li><a href="/create">Create Postcard</a></li>
                <li><a href="/logout">Logout</a></li>` : html`<!--Only Guest-->
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>`}
            </ul>`

function renderNav(ctx, next) {
    render(navView(ctx.user._id), nav)
    next()
}

function decorateContext(ctx, next) {
    ctx.render = view => render(view, main)
    ctx.user = getUserData()
    ctx.query = Object.fromEntries(ctx.querystring.split('&').map(s => s.split('=')))
    next()
}

page(decorateContext)
page(renderNav)
page('/index.html', '/')
page('/', showHome)
page('/login', showLogin)
page('/register', showRegister)
page('/logout', onLogout)
page('/dashboard', showDashboard)
page('/dashboard/edit/:id', showEdit)
page('/dashboard/:id', showDetails)
page('/create', showCreate)
page.start()

function onLogout(ctx) {
    logout()
    removeUserData()
    ctx.page.redirect('/')
}