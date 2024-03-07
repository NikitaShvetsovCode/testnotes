import dynamic from 'next/dynamic';
import { MainLayout } from '../../components/Layout/MainLayout';

export default function AddNotePage() {
  const AddNote = dynamic(() => import('@/components/Notes/AddNote'));

  return (
    <MainLayout title="Страница добавления заметки">
      <AddNote />
    </MainLayout>
  );
}
