import axios from 'axios';

// Define an API
const projectAPI = axios.create({
<<<<<<< HEAD
   //deployment for backend
    baseURL: 'http://localhost:55000'
})
=======
  //deployment for backend
  baseURL: "https://projectprioritization.herokuapp.com/",
});
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7

//If we don't have these code, it will give us 401 error, we are not specified any authorization header to our request. 
//We are not saving and giving the token to the API even we log in to a user.
//Add authorization header to the request that would make to our API
projectAPI.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
    
})

 export default projectAPI;