import axios from 'axios';

// Define an API
const projectAPI = axios.create({
   //deployment for backend
    baseURL: 'http://localhost:55000'
})

//If we don't have these code, it will give us 401 error, we are not specified any authorization header to our request. 
//We are not saving and giving the token to the API even we log in to a user.
//Add authorization header to the request that would make to our API
projectAPI.interceptors.request.use((req) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
    
})

 export default projectAPI;