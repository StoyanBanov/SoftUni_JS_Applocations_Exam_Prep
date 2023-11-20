export function manageSubmit(callback) {
    return (e) => {
        e.preventDefault()
        callback(Object.fromEntries(new FormData(e.target)))
    }
}

export function checkForEmptyFields(data) {
    const isFieldEmpty = Object.values(data).some(d => d == '')
    if (isFieldEmpty) window.alert('All fields are required!')
    return isFieldEmpty
}

export function setUserData(user) {
    sessionStorage.setItem('token', user.accessToken)
    sessionStorage.setItem('id', user._id)
}

export function getUserData() {
    return {
        _token: sessionStorage.getItem('token'),
        _id: sessionStorage.getItem('id')
    }
}

export function removeUserData() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
}