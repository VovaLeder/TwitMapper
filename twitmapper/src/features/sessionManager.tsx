import axios from "axios";

export function setSession(token: string, login: string, isAdmin: boolean){
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('isAdmin', isAdmin ? "1" : "0");
    localStorage.setItem('token', token);
    axios.defaults.headers.common["auth"] = token;
}

export function resetSession(){
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    axios.defaults.headers.common["auth"] = "";
}

export function isAdmin() {
    return (sessionStorage.getItem('isAdmin') === "1");
}

export function getLogin() {
    return sessionStorage.getItem('login');
}