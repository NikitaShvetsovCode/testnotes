import React, { useEffect } from 'react';
import { fetchNotes, editNote, addNoteAsync } from '@/store/slices/noteSlice';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import styles from '@/styles/components/NoteList.module.scss';
import Link from 'next/link';

export default function NotesList() {
  const dispatch = useDispatch();
  const { list: notes, status } = useSelector((state: { notes: { list: Note[]; status: string } }) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className={styles.notesListContainer}>
      <div className={`h3 ${styles.h3}`}>Заметки</div>

      {status === 'loading' && <Image className="image" src="/preloader.gif" alt="preloader" width="50" height="50" quality={100} />}

      {status === 'failed' && <div>Ошибка загрузки, проверьте ваше соединение....</div>}

      {status === 'succeeded' && (
        <div className={styles.noteList}>
          {notes.map((note: Note) => (
            <div className={styles.note} key={note.id}>
              <div className={styles.noteTitle}>{note.title}</div>
              <div className={styles.noteContent}>{note.content}</div>

              <Link href={`/editNote/${note.id}`}>Редактировать</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
