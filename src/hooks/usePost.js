import { useEffect, useState } from "react";
import { loadPost, loadPosts } from "../api";
import { useAsyncEffect } from "./useAsyncEffect";

export function usePost(postId) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(async () => {
    const post = await loadPost(postId);
    setPost(post);
    setLoading(false);
  }, []);

  return { loading, post };
}
