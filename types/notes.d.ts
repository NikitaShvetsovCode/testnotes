interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteState {
  list: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
