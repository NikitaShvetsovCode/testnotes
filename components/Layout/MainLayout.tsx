import Head from 'next/head';
import React from 'react';
import styles from '@/styles/Container.module.scss';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });

export function MainLayout({ children, title, keywords, description }: { children?: any; title: string; keywords?: string; description?: string }) {
  const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'));

  return (
    <>
      <Head>
        <title>{title ? title : 'Заголовок страницы'}</title>
        {keywords ? <meta name="keywords" content={`${keywords}`} /> : <meta name="keywords" content="ключевые слова" />}
        {description ? <meta name="description" content={`${description}`} /> : <meta name="description" content="Описание страницы" />}
        <meta charSet="utf-8" />
      </Head>

      <div className={`${styles.appContainer} ${montserrat.className}`}>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
