import projectAPI from "../config/api";



export async function register(data) {
  const response = await projectAPI.post("/api/auth/signUp", data);
  
  return response.data;
}

export async function login(data) {
  
  const response = await projectAPI.post('/api/auth/signIn', data);
  return response.data;
}

export async function logout() {
  //clear the token of the current user when we press logout
  localStorage.clear();
  return "Logged out.";
}
