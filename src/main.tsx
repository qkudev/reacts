import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./apps";
import { ContainerProvider } from "./container/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContainerProvider>
    <App />
  </ContainerProvider>,
);
