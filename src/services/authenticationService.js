const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export {signUp, login, signOut, passwordReset, passwordChange, isAuthed};

async function signUp(data) {
    const url = `${BASE_URL}/user/create`;
    const response = await fetch(url, {method: 'POST', body: data})
    const responseJSON = await response.json()
    if (response.ok) {
        return responseJSON
    }
    throw new Error(responseJSON.message)
}

async function login(credentials) {
    const url = `${BASE_URL}/authentication/login`;
    const response = await fetch(url, {method: 'POST', headers: {'Accept': 'application/json',
    'content-type': 'application/json'}, body: JSON.stringify(credentials)})
    const responseJSON = await response.json()
    if(response.ok) {
        localStorage.setItem("authed", "true")
        localStorage.setItem("sessionTimeout", responseJSON.sessionTimeout)
        return responseJSON
    }
    throw new Error(responseJSON.message)
}

async function signOut() {
    const url = `${BASE_URL}/authentication/logout`;
    const response = await fetch(url, {method: 'GET'})
    if (response.ok) {
        localStorage.setItem("authed", "false")
        localStorage.setItem("sessionTimeout", "0")
        return response
    }
    throw new Error(response.message)
}

function passwordReset() {
    console.log("reset password")
}

function passwordChange() {
    console.log("change password")
}

function isAuthed() {
    if (Date.now() < localStorage.getItem("sessionTimeout")) {
        return true;
    } 
    return false;
}
