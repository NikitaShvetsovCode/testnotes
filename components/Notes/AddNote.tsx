import { useSelector, useDispatch } from 'react-redux';
import { addNoteAsync } from '@/store/slices/noteSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import styles from '@/styles/components/AddNote.module.scss';
import TextField from '@mui/material/TextField';
import { customTheme } from '@/components/Input/InputTheme';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';

export default function AddNote() {
  const dispatch = useDispatch();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const outerTheme = useTheme();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      toast('Заголовок и текст должны быть заполнены!');
    } else {
      toast('Заметка успешно добавлена!');
      dispatch(addNoteAsync({ title: noteTitle, content: noteContent }));
      setNoteTitle('');
      setNoteContent('');
    }
  };

  return (
    <div className={styles.addNoteContainer}>
      <form onSubmit={handleAddNote}>
        <div className={`h3 ${styles.h3}`}>Добавить новую заметку</div>

        <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField
            value={noteTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNoteTitle(e.target.value)}
            label="Введите заголовок"
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

        <Textarea
          minRows={10}
          placeholder="Введите текст…"
          value={noteContent}
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
