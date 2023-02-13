const BASE_URL = "/api/post";

// fonction pour ajouter un post
export async function createPost(data) {
  try {
    console.log(data);
    const fd = new FormData();

    fd.append("text", data.text);
    fd.append("image", data.image);

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: fd,
    });

    const post = await response.json();

    if (response.ok) {
      return post;
    } else {
      throw post;
    }
  } catch (e) {
    console.log(e);
  }
}

// fonction pour recuperer tout les posts
export async function getAllPosts() {
  try {
    const response = await fetch(BASE_URL);

    if (response.ok) {
      const posts = await response.json();
      return posts;
    }
  } catch (e) {
    console.log(e);
  }
}
