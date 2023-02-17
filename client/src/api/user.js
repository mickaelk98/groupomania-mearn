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

// fonction pour mettre a jour un utilisateur
export async function editUser(userId, data) {
  try {
    const fd = new FormData();

    fd.append("userName", data.userName);
    fd.append("email", data.email);
    fd.append("password", data.password);
    fd.append("image", data.image);
    fd.append("description", data.description);

    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      body: fd,
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
