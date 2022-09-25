import { useEffect, useState } from "react";
import { loadPosts } from "../api";
import { useAsyncEffect } from "./useAsyncEffect";

export function usePosts(page) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(async () => {
    setLoading(true);
    const posts = await loadPosts(page);
    setPosts(posts);
    setLoading(false);
  }, [page]);

  return { loading, posts, setPosts };
}
