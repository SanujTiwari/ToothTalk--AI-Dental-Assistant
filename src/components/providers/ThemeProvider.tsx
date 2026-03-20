"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Theme = "light" | "dark" | "custom";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function fetchTheme() {
      if (isLoaded && user) {
        try {
          // We can fetch user data here or use syncUser result
          // For now, let's assume we have a getMyProfile action or similar
          const response = await fetch('/api/user/profile');
          const data = await response.json();
          if (data.chatTheme) {
            setThemeState(data.chatTheme as Theme);
          }
        } catch (error) {
          console.error("Failed to fetch theme", error);
        }
      }
    }
    fetchTheme();
  }, [isLoaded, user]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "custom");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
