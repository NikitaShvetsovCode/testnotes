import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/index';
import { editNoteAsync } from '@/store/slices/noteSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/AddNote.module.scss';
import { useRouter } from 'next/router';
import { RootState } from '@/store/index';
import TextField from '@mui/material/TextField';
import { customTheme } from '@/components/Input/InputTheme';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';

export default function EditNote() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const selectedNote = useSelector((state: RootState) =>
    state.notes.list.find((note: Note) => note.id === (id ? parseInt(id as string, 10) : undefined))
  );
  const [noteTitle, setNoteTitle] = useState(selectedNote?.title || '');
  const [noteContent, setNoteContent] = useState(selectedNote?.content || '');
  const outerTheme = useTheme();

  const handleEditNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      toast('Заголовок и текст должны быть заполнены!');
    } else {
      try {
        toast('Заметка успешно исправлена!');
        await dispatch(editNoteAsync({ id: typeof id === 'string' ? parseInt(id, 10) : NaN, title: noteTitle, content: noteContent }));
        setNoteTitle('');
        setNoteContent('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  return (
    <div className={styles.addNoteContainer}>
      <form onSubmit={handleEditNote}>
        <div className={`h3 ${styles.h3}`}>Редактирование заметки</div>

        <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField
            value={noteTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNoteTitle(e.target.value)}
            label="Введите заголовок"
            variant="outlined"
            className={styles.input}
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

        <Textarea
          minRows={10}
          placeholder="Введите текст…"
          value={noteContent}
          className={styles.textarea}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteContent(e.target.value)}
          sx={{
            fontFamily: 'Montserrat',
            background: 'var(--background-color)',
            color: 'var(--inv-background-color)',
            borderColor: 'var(--border)',
            fontSize: '1.6rem',
            marginBottom: '1.5rem',
            width: '30rem',

            '--Textarea-placeholderOpacity': 1,

            '&::placeholder': {
              color: 'var(--inv-background-color)',
              opacity: '1',
            },

            '&::before': {
              border: '1.5px solid var(--Textarea-focusedHighlight)',
              transform: 'scaleX(0)',
              left: '2.5px',
              right: '2.5px',
              bottom: 0,
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
              borderBottomLeftRadius: '64px 20px',
              borderBottomRightRadius: '64px 20px',
            },

            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
        />

        <button type="submit" className={styles.submitButton}>
          Сохранить
        </button>
      </form>
    </div>
  );
}
