import styles from '@/styles/Home.module.scss';
import { useEffect } from 'react';
import { fetchNotes, editNote, addNoteAsync } from '../store/slices/noteSlice';
import { useSelector, useDispatch } from 'react-redux';
import { MainLayout } from '@/components/Layout/MainLayout';
import dynamic from 'next/dynamic';

export default function Home() {
  const NotesList = dynamic(() => import('@/components/Notes/NotesList'));

  return (
    <MainLayout
      title="Главная страница"
      description="Добро пожаловать в наше интуитивно понятное и удобное приложение для заметок! Здесь вы можете легко создавать, редактировать и управлять своими заметками, помогая сделать вашу повседневную жизнь более организованной. Наше приложение предоставляет простой и интуитивно понятный интерфейс, который позволяет вам фокусироваться на самом важном — ваших идеях и задачах."
    >
      <NotesList />
    </MainLayout>
  );
}
