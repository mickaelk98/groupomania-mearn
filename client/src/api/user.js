const BASE_URL = "/api/user";

// fonction pour savoir si l'utilisateur est connecter
export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
}
