import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import LoadingProgress from "./components/LoadingProgress";

createRoot(document.getElementById("root")!).render(
  <>
    <LoadingProgress />
    <App />
  </>
);
