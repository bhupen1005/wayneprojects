// src/components/PostItem.tsx
import React from "react";
import { Post } from "../types/post";
import { useDeletePostMutation } from "../api/postsApi";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [deletePost] = useDeletePostMutation();

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => deletePost(post.id)}>Delete</button>
    </div>
  );
};

export default PostItem;
