import { useSelector, useDispatch } from 'react-redux';
import { editNoteAsync } from '@/store/slices/noteSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import styles from '@/styles/components/AddNote.module.scss';
import { useRouter } from 'next/router';

export default function EditNote() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const selectedNote = useSelector((state) => state.notes.list.find((note: Note) => note.id === parseInt(id)));

  const [noteTitle, setNoteTitle] = useState(selectedNote.title);
  const [noteContent, setNoteContent] = useState(selectedNote.content);

  const handleEditNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      toast('Заголовок и текст должны быть заполнены!');
    } else {
      toast('Заметка успешно исправлена!');
      dispatch(editNoteAsync({ id: id, title: noteTitle, content: noteContent }));
      setNoteTitle('');
      setNoteContent('');
    }
  };

  return (
    <div className={styles.addNoteContainer}>
      <form onSubmit={handleEditNote}>
        <div className="h3">Редактирование заметки</div>

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
