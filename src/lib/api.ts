export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

export async function getPosts() {
  return apiCall("/posts");
}

export async function getPost(id: number) {
  return apiCall(`/posts/${id}`);
}

export async function createPost(data: any) {
  return apiCall("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getComments(postId: number) {
  return apiCall(`/comments?postId=${postId}`);
}

export async function createComment(data: any) {
  return apiCall("/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser() {
  return apiCall("/auth");
}

export async function logout() {
  return apiCall("/auth", {
    method: "POST",
    body: JSON.stringify({ action: "logout" }),
  });
}

export async function registerUser(email: string, username: string) {
  return apiCall("/register", {
    method: "POST",
    body: JSON.stringify({ email, username }),
  });
}

export async function verifyEmail(email: string, code: string) {
  return apiCall("/verify-email", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

export async function getUserProfile() {
  return apiCall("/user/profile");
}

export async function submitContactForm(data: any) {
  return apiCall("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAdminPosts() {
  return apiCall("/admin/posts");
}

export async function updatePostStatus(
  postId: number,
  status: string,
  rejectionReason?: string
) {
  return apiCall("/admin/posts", {
    method: "PATCH",
    body: JSON.stringify({ postId, status, rejectionReason }),
  });
}
