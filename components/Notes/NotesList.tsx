import React, { useEffect, useState } from 'react';
import { fetchNotes, editNote, addNoteAsync, deleteNoteAsync } from '@/store/slices/noteSlice';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import styles from '@/styles/components/NoteList.module.scss';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import { customTheme } from '@/components/Input/InputTheme';
import { ThemeProvider, useTheme } from '@mui/material/styles';

export default function NotesList() {
  const dispatch = useDispatch();
  const { list: notes, status } = useSelector((state: { notes: { list: Note[]; status: string } }) => state.notes);
  const [searchQuery, setSearchQuery] = useState('');
  const outerTheme = useTheme();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDeleteNote = async (noteId: number) => {
    await dispatch(deleteNoteAsync(noteId));

    await dispatch(fetchNotes());
  };

  const filteredNotes = notes.filter(
    (note: Note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.notesListContainer}>
      <div className={`h3 ${styles.h3}`}>Заметки</div>

      {status === 'loading' && <Image className={styles.preloader} src="/preloader.gif" alt="preloader" width="50" height="50" quality={100} />}

      {status === 'failed' && <div>Ошибка загрузки, проверьте ваше соединение....</div>}

      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          label="Поиск..."
          variant="outlined"
          InputProps={{
            style: {
              fontFamily: 'Montserrat',
              fontSize: '1.6rem',
              color: 'var(--inv-background-color)',
              marginBottom: '1.5rem',
              width: '30rem',
            },
          }}
          InputLabelProps={{
            style: {
              fontFamily: 'Montserrat',
              fontSize: '1.6rem',
              color: 'var(--inv-background-color)',
            },
          }}
        />
      </ThemeProvider>

      {status === 'succeeded' && (
        <div className={styles.noteList}>
          {filteredNotes.length === 0 ? (
            <div>Заметок нет...</div>
          ) : (
            filteredNotes.map((note: Note) => (
              <div className={styles.note} key={note.id}>
                <div className={styles.noteActions}>
                  <Link href={`/editNote/${note.id}`}>
                    <FaRegEdit />
                  </Link>

                  <IoClose className={styles.buttonDelete} onClick={() => handleDeleteNote(note.id)} fontSize={23} />
                </div>

                <div className={styles.noteTitle}>{note.title}</div>
                <div className={styles.noteContent}>{note.content}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
