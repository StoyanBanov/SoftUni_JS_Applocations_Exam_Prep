import { post, get } from "./api.js"

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout'
}

export function login(user) {
    return post(endpoints.login, user)
}

export function register(user) {
    return post(endpoints.register, user)
}

export function logout() {
    return get(endpoints.logout)
}