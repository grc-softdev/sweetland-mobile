import axios from "axios";


const api = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: //'http://192.168.0.195:3333', // Replace with your backend port
    'http://sweetland-server.vercel.app'

})

export { api };     