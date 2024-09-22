import "./styles/index.css";
import "./styles/tailwind.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Layout } from "./layout/ui";
import { routeTree } from "./routes/routeTree.gen";
import GlobalStyles from "./styles/globalStyles";
import { ThemeProvider } from "./theme/model/themeContext";

const router = createRouter({ routeTree });

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
        <Layout>
          <GlobalStyles />
          <RouterProvider router={router} />
        </Layout>
      </ThemeProvider>
    </StrictMode>
  );
}
