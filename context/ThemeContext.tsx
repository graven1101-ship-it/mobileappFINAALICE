import React, { createContext, useState, useContext, ReactNode } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const colors = {
  light: {
    background: "#fff",
    text: "#333",
    subtext: "#999",
    border: "#E8E8E8",
    lightBg: "#F5F5F5",
  },
  dark: {
    background: "#000000",
    text: "#fff",
    subtext: "#999",
    border: "#1a1a1a",
    lightBg: "#0a0a0a",
  },
};
