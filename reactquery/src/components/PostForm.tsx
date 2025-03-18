// src/components/PostForm.tsx
import React, { useState } from "react";
import { useAddPostMutation } from "../api/postsApi";

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost({ title, body, userId: 1 });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
