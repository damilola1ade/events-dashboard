import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from 'sonner'
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, //Will retry to fectch the data 3 times before displayinh an error
      staleTime: 5000 // the data will be considered fresh for 5000ms (5s)
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Router>
      <Toaster />
        <App />
      </Router>
    </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
