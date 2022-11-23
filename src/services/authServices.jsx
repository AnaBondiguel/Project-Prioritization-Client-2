import projectAPI from "../config/api";

export async function register(data) {
  const response = await projectAPI.post("/api/auth/signUp", data);
  
  return response.data;
}

export async function login(data) {
  
  const response = await projectAPI.post('/api/auth/signIn', data);
  return response.data;
}

export async function updateUser(data) {
  const response = await projectAPI.patch(`/api/users/${data.id}`, data)
  return response.data;
}


export async function logout() {
  return "Logged out.";
}
