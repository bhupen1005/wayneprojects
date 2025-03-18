import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(<App />);
