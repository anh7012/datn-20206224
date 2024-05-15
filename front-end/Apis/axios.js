import axios from "axios";

export  const  api = axios.create({
    baseUrl: 'http://localhost:7012/',
    headers:{

    }

    })