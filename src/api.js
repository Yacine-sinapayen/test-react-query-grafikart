import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8055/",
  timeout: 5000,
  headers: {
    Authorization: `Bearer secret`,
  },
});

export function loadPosts(
  page = 1,
  fields = ["id", "title", "status", "date_created", "thumbnail"]
) {
  const params = new URLSearchParams();
  params.set("limit", "10");
  params.set("page", page);
  if (fields) {
    params.set("fields", fields.join(","));
  }
  return api.get("/items/post?" + params.toString()).then((r) => r.data.data);
}

export function loadPost(id, fields = null) {
  const params = new URLSearchParams();
  if (fields) {
    params.set("fields", fields.join(","));
  }
  return api
    .get(`/items/post/${id}?${params.toString()}`)
    .then((r) => r.data.data);
}

export function updatePost(id, data) {
  return api.patch(`/items/post/${id}`, data).then((r) => r.data.data);
}

export function createPost(data) {
  return api.post(`/items/post`, data).then((r) => r.data.data);
}
