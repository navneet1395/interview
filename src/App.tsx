import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/auth.store";
import Login from "./pages/login";
import Launches from "./pages/launches";
import LaunchDetail from "./pages/launchDetail";
import "./App.scss";
import "./style.scss";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

// Initialize the QueryClient
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/launches" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/launches"
              element={
                <ProtectedRoute>
                  <Launches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/launches/:id"
              element={
                <ProtectedRoute>
                  <LaunchDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
