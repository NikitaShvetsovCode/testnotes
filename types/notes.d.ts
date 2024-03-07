interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteState {
  list: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
