import styles from '@/styles/components/Theme.module.scss';
import { ThemeContext } from './ThemeProvider';
import { useContext } from 'react';

export default function Theme({ className }: { className?: string }) {
  const { theme, switchTheme } = useContext(ThemeContext);

  return <div className={`className ${styles.root} ${theme === 'dark' ? styles.dark : styles.light} ${className}`} onClick={switchTheme} />;
}
