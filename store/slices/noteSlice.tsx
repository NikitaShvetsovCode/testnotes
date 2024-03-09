import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ObjectId } from 'mongodb';

// фетч в виде thunk для получения заметок
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch('/api/notesDB');
  const data = await response.json();
  return data;
});

// фетч в виде thunk для добавления заметки
export const addNoteAsync = createAsyncThunk('notes/addNoteAsync', async (note: { title: string; content: string }) => {
  const response = await fetch('/api/notesDB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const data = await response.json();
  return data;
});

// фетч в виде thunk для редактирования заметки
export const editNoteAsync = createAsyncThunk('notes/editNoteAsync', async (note: Note) => {
  console.log(note, 'NOTEEEEE');
  const response = await fetch(`/api/notesDB`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ id: note._id, title: note.title, content: note.content }),
  });
  const data = await response.json();
  return data;
});

// фетч в виде thunk для удаления заметки
export const deleteNoteAsync = createAsyncThunk('notes/deleteNoteAsync', async (noteId: string) => {
  const response = await fetch(`/api/notesDB`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ deleteId: noteId }),
  });

  const data = await response.json();
  return data;
});

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  } as NoteState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      // Загружающиеся заметки
      .addCase(fetchNotes.pending, (state: NoteState) => {
        state.status = 'loading';
      })
      // Загрузившиеся заметки
      .addCase(fetchNotes.fulfilled, (state: NoteState, action: PayloadAction<Note[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      // Ошибка при получении заметок
      .addCase(fetchNotes.rejected, (state: NoteState, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Добавление в наш массив новой заметки
      .addCase(addNoteAsync.fulfilled, (state: NoteState, action: PayloadAction<Note>) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      // Редактирование заметки
      .addCase(editNoteAsync.fulfilled, (state: NoteState, action: PayloadAction<Note>) => {
        state.status = 'succeeded';

        // Находим заметку, в которой id совпадает с той которую изменяли
        const updatedNoteIndex = state.list.findIndex((note: Note) => note._id === action.payload._id);

        // Заменяем новой информацией по айди в нашем массиве
        state.list[updatedNoteIndex] = action.payload;
      })
      // Удаление заметки
      .addCase(deleteNoteAsync.fulfilled, (state: NoteState, action: PayloadAction<{ noteId: string; data: any }>) => {
        state.status = 'succeeded';
        // Удаление заметки из массива по ее id
        state.list = state.list.filter((note: Note) => note._id !== action.payload.noteId);
      });
  },
});

export default noteSlice.reducer;
