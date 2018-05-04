import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export {signUp, login, signOut, passwordReset, passwordChange, isAuthed};

function signUp(data) {
    const url = `${BASE_URL}/user/create`;
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(url , data, config).then((response) => 
        {
            localStorage.setItem("authed", "true")
            localStorage.setItem("sessionTimeout", response.data.sessionTimeout)
            resolve(response)
        }, (failure)=> {
            reject(failure.response)
        });
    })
}

function login(em, pw) {
    const url = `${BASE_URL}/authentication/login`;
    return new Promise((resolve, reject) => {
        axios.post(url , {email: em, password: pw}, {withCredentials: true}).then((response) => 
        {
            localStorage.setItem("authed", "true")
            localStorage.setItem("sessionTimeout", response.data.sessionTimeout)
            resolve(response)
        }, (failure)=> {
            reject(failure.response)
        });
    })
}

function signOut() {
    const url = `${BASE_URL}/authentication/logout`;
    return new Promise((resolve, reject) => {
        axios.get(url, {withCredentials: true}).then((response) => 
        {
            localStorage.setItem("authed", "false")
            localStorage.setItem("sessionTimeout", "0")
            resolve(response)
        }, (failure)=> {
            reject(failure.response)
        });
    })
}

function passwordReset() {
    console.log("reset password")
}

function passwordChange() {
    console.log("change password")
}

function isAuthed() {
    //compare current time to timeout time, and state 
    if (Date.now() < localStorage.getItem("sessionTimeout")) {
        return true;
    } 
    return false;

}
