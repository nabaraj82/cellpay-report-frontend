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
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a395c0d47dacf70cfd9165a06c4e40d7@o4509309209804800.ingest.us.sentry.io/4509309211246592",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});


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
