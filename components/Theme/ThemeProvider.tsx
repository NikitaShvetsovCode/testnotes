import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    let localTheme = window.localStorage.getItem('theme');

    if (localTheme !== null) {
      setTheme(localTheme);
    }

    if (localTheme === null) {
      setTheme('dark');
    }
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
};
