// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import PostsPage from "./pages/PostsPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostsPage />
    </Provider>
  );
};

export default App;
