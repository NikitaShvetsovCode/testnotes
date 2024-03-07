import styles from '@/styles/components/Theme.module.scss';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function Theme() {
  const { theme, switchTheme } = useContext(ThemeContext);

  return <div className={`className ${styles.root} ${theme === 'dark' ? styles.dark : styles.light}`} onClick={switchTheme} />;
}
