import axios from "axios";

export function setSession(token: string, login: string){
    sessionStorage.setItem('login', login);
    localStorage.setItem('token', token);
    axios.defaults.headers.common["auth"] = token;
}

export function resetSession(){
    sessionStorage.removeItem('login');
    localStorage.removeItem('token');
    axios.defaults.headers.common["auth"] = "";
}