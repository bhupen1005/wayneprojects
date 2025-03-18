// src/components/PostList.tsx
import React from "react";
import { useGetPostsQuery } from "../api/postsApi";
import PostItem from "./PostItem";

const PostList: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsQuery(undefined, { refetchOnMountOrArgChange: false });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>{posts?.map((post) => <PostItem key={post.id} post={post} />)}</div>
  );
};

export default PostList;
