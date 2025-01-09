import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Demo credentials
        const demoCredentials = {
          email: "ben@scriptassist.co.uk",
          password: "ben@scriptassist", // You can change this to any password for testing
        };

        // Check if the entered email and password match the demo credentials
        if (
          email === demoCredentials.email &&
          password === demoCredentials.password
        ) {
          set({ isAuthenticated: true, user: { email } });
        } else {
          throw new Error("Invalid credentials");
        }
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
