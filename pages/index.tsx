import { MainLayout } from '@/components/Layout/MainLayout';
import dynamic from 'next/dynamic';
import { ipAddress } from '@vercel/edge';

export default function Home() {
  const NotesList = dynamic(() => import('@/components/Notes/NotesList'));
  // const ip = ipAddress(Request);
  const req = new Request('https://testnotes-seven.vercel.app/');

  const ip = ipAddress(req);

  console.log(ip, 'IPADRESS');
  return (
    <MainLayout
      title="Главная страница"
      description="Добро пожаловать в наше интуитивно понятное и удобное приложение для заметок! Здесь вы можете легко создавать, редактировать и управлять своими заметками, помогая сделать вашу повседневную жизнь более организованной. Наше приложение предоставляет простой и интуитивно понятный интерфейс, который позволяет вам фокусироваться на самом важном — ваших идеях и задачах."
    >
      <NotesList />
    </MainLayout>
  );
}
