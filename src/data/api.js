import { getUserData } from "../util.js"

const host = `http://localhost:3030/`

async function request(method, url, body) {
    const options = {
        method,
        headers: {}
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }
    const token = getUserData()._token
    if (token) options.headers['X-Authorization'] = token
    try {
        const response = await fetch(host + url, options)
        let data
        try {
            data = await response.json()
        } catch (error) {
            return response
        }
        if (!response.ok) throw data.message
        return data
    } catch (error) {
        window.alert(error)
        throw error
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')