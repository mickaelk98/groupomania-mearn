const BASE_URL = "/api/auth";

// fonction d'inscription
export async function signup(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "content-Type": "application/json",
      },
    });

    const user = await response.json();

    if (response.ok) {
      return user;
    } else {
      throw user;
    }
  } catch (e) {
    throw e;
  }
}

// fonction de connexion
export async function login(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "content-Type": "application/json",
      },
    });

    const user = await response.json();

    if (response.ok) {
      return user;
    } else {
      throw user;
    }
  } catch (e) {
    throw e;
  }
}

// fonction de deconnexion
export async function logout() {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
    });

    console.log(await response.json());
  } catch (e) {
    throw e;
  }
}
