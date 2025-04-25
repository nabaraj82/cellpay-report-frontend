import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { authConfig } from "./config/authConfig.js";
import { AuthProvider } from "react-oidc-context";
import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from "./queryClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider {...authConfig}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
