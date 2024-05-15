import {api} from "./axios.js";

export  const  appApi = {
    getUser(){
        return api.get('http://localhost:7012/users')
    }
}