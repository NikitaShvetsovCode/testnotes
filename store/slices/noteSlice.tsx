import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch('http://localhost:3001/notes');
  const data = await response.json();
  return data;
});

export const addNoteAsync = createAsyncThunk('notes/addNoteAsync', async (note: { title: string; content: string }) => {
  const response = await fetch('http://localhost:3001/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const data = await response.json();
  return data;
});

export const editNoteAsync = createAsyncThunk('notes/editNoteAsync', async (note: Note) => {
  const response = await fetch(`http://localhost:3001/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const data = await response.json();
  return data;
});

export const deleteNoteAsync = createAsyncThunk('notes/deleteNoteAsync', async (noteId: Number) => {
  const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
    method: 'DELETE',
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
        const updatedNoteIndex = state.list.findIndex((note: Note) => note.id === action.payload.id);

        // Заменяем новой информацией по айди в нашем массиве
        state.list[updatedNoteIndex] = action.payload;
      })
      // Удаление заметки
      .addCase(deleteNoteAsync.fulfilled, (state: NoteState, action: PayloadAction<{ noteId: number; data: any }>) => {
        state.status = 'succeeded';
        // Удаление заметки из массива по ее id
        state.list = state.list.filter((note: Note) => note.id !== action.payload.noteId);
      });
  },
});

export default noteSlice.reducer;
