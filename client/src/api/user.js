const BASE_URL = "/api/user";

// fonction pour savoir si l'utilisateur est connecter
export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
}

// fonction pour savoir si l'utilisateur est connecter
export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    const users = await response.json();

    return users;
  } catch (e) {
    throw e;
  }
}
