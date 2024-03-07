import { useSelector, useDispatch } from 'react-redux';
import { addNoteAsync } from '@/store/slices/noteSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import styles from '@/styles/components/AddNote.module.scss';

export default function AddNote() {
  const dispatch = useDispatch();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

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
        <div className="">Добавить новую заметку</div>

        <label className={styles.label}>
          Заголовок
          <input type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        </label>
        <label className={styles.label}>
          Заголовок
          <input type="text" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
        </label>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
