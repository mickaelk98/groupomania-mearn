const BASE_URL = "/api/post";

// fonction pour ajouter un post
export async function createPost(data) {
  try {
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
    throw e;
  }
}

// fonction pour recuperer tout les posts
export async function getAllPosts() {
  try {
    const response = await fetch(BASE_URL);
    const posts = await response.json();

    if (posts) {
      // verifie si l'on recoit un tableau ou un objet
      if (Array.isArray(posts)) {
        // ajoute la cle edit a false sur chaque element
        const allPosts = posts.map((p) => {
          return { ...p, edit: false };
        });
        return allPosts;
      } else {
        // ajoute la cle edit a false a l'objet
        const allPosts = { ...posts, edit: false };
        return allPosts;
      }
    }
  } catch (e) {
    throw e;
  }
}

// fonction pour modifier un post
export async function editPost(data, postId) {
  try {
    const fd = new FormData();

    fd.append("text", data.text);
    fd.append("image", data.image);

    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: "PUT",
      body: fd,
    });

    const post = await response.json();

    if (response.ok) {
      return post;
    } else {
      throw post;
    }
  } catch (e) {
    throw e;
  }
}

// fonction pour supprimer un post
export async function deleteOnePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: "DELETE",
    });

    const post = await response.json();

    if (response.ok) {
      return post;
    } else {
      throw post;
    }
  } catch (e) {
    throw e;
  }
}

// fonction pour liké et disliké un post
export async function likeAndDislikePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/like/${postId}`, {
      method: "POST",
    });

    const post = await response.json();

    if (response.ok) {
      return post;
    } else {
      throw post;
    }
  } catch (e) {
    throw e;
  }
}

// foction pour commenter un post
export async function commentOnePost(postId, text) {
  try {
    const response = await fetch(`${BASE_URL}/comment/${postId}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const post = await response.json();

    if (response.ok) {
      return post;
    } else {
      throw post;
    }
  } catch (e) {
    throw e;
  }
}
