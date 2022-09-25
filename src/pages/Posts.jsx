import { Link } from "@reach/router";
import { usePosts } from "../hooks/usePosts";
import { loadPosts, updatePost } from "../api";
import { useState } from "react";
import { useToggle } from "../hooks/useToggle";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export function Posts() {
  const queryKey = ["posts"];
  const { isLoading, data, isFetching, fetchNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam }) => loadPosts(pageParam || 1),
    {
      // staleTime: 60_000,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );
  const posts = data?.pages?.flat() || [];

  const queryClient = useQueryClient();
  const { mutate: handleTitleUpdate } = useMutation(
    ({ id, title }) => updatePost(id, { title }),
    {
      onMutate: async ({ id, title }) => {
        await queryClient.cancelQueries(queryKey);
        const previousPosts = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (data) => {
          return {
            ...data,
            pages: data.pages.map((page) =>
              page.map((p) => (p.id === id ? { ...p, title } : p))
            ),
          };
        });
        return { previousPosts };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context.previousPosts);
      },
    }
  );

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Les articles</h2>

      {isFetching && (
        <div className="ui active centered mini inverted inline loader fixed"></div>
      )}

      <table
        className="ui very basic collapsing celled table"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostRow
              onTitleUpdate={handleTitleUpdate}
              post={post}
              key={post.id}
            />
          ))}
          {isLoading && (
            <tr>
              <td colSpan={5}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex" style={{ paddingBottom: "3rem" }}>
        <button
          className="ui button"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}

function PostRow({ post, onTitleUpdate }) {
  const [state, setState] = useState("view");
  const [loading, toggleLoading] = useToggle();
  const handleBlur = async (e) => {
    toggleLoading();
    const value = e.target.value;
    await onTitleUpdate({ id: post.id, title: value });
    toggleLoading();
    setState("view");
  };
  return (
    <tr>
      <td>
        <Link to={`/posts/${post.id}`}>#{post.id}</Link>
      </td>
      <td className="ui form">
        {state === "view" && (
          <div onDoubleClick={() => setState("edit")}>{post.title}</div>
        )}
        {state === "edit" && (
          <div>
            <input
              defaultValue={post.title}
              onBlur={handleBlur}
              autoFocus
              disabled={loading}
            />
            {loading && (
              <div className="ui active inverted dimmer">
                <div className="ui mini loader" />
              </div>
            )}
          </div>
        )}
      </td>
      <td>
        {post.status === "published" ? (
          <span className="ui green empty circular label">&nbsp;</span>
        ) : (
          <span className="ui grey empty circular label">&nbsp;</span>
        )}
      </td>
      <td>
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "full",
        }).format(new Date(post.date_created))}
      </td>
      <td>
        <Link to={`/posts/${post.id}`} className="ui small button">
          <i className="icon edit alternate outline" />
          Modifier
        </Link>
      </td>
    </tr>
  );
}
