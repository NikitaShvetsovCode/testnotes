import React from 'react';
import styles from '@/styles/components/Sidebar.module.scss';
import Theme from '@/components/Theme/index';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';
import { BsPlusLg } from 'react-icons/bs';

export default function Sidebar() {
  return (
    <div>
      <aside className={styles.sidebar}>
        <Theme className={styles.sidebarItem} />

        <Link href="/" className={styles.sidebarItem}>
          <IoHomeOutline fontSize={23} />
        </Link>

        <Link href="/addNote" className={styles.sidebarItemPlus}>
          <BsPlusLg fontSize={26} />
        </Link>
      </aside>
    </div>
  );
}
