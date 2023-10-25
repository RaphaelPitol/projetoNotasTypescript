import React, { createContext, useState, useEffect, ReactNode } from "react";

// Definição do tipo do contexto
interface ThemeContextType {
  theme: "light" | "dark";
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");



  const toggleTheme = () => {
    
    localStorage.setItem('scrollPosition', window.scrollY.toString());

    if (theme === "light") {
      localStorage.setItem('theme', 'dark');
      document.body.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem('theme', 'light'); 
      document.body.removeAttribute("data-theme");
      setTheme("light");
    }
  };


  useEffect(() => {
  
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setTheme("dark");
    }
  }, []);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode: theme === "dark"}}>
      {children}
    </ThemeContext.Provider>
  );
};
