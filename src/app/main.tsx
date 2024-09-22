import "./styles/index.css";
import "./styles/tailwind.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "./layout/ui";
import { routeTree } from "./routes/routeTree.gen";
import GlobalStyles from "./styles/globalStyles";
import { ThemeProvider } from "./theme/model/themeContext";

const router = createRouter({ routeTree });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <GlobalStyles />
            <RouterProvider router={router} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
