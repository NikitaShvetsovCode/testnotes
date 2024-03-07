import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import dynamic from 'next/dynamic';

export default function EditNote() {
  const EditNoteForm = dynamic(() => import('@/components/Notes/EditNote'));

  return (
    <MainLayout
      title="Страница редактирования заметки"
      description="Добро пожаловать в наше интуитивно понятное и удобное приложение для заметок! Здесь вы можете легко создавать, редактировать и управлять своими заметками, помогая сделать вашу повседневную жизнь более организованной. Наше приложение предоставляет простой и интуитивно понятный интерфейс, который позволяет вам фокусироваться на самом важном — ваших идеях и задачах."
    >
      <EditNoteForm />
    </MainLayout>
  );
}
