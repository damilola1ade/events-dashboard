import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "sonner";
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Toaster />
            <App />
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
