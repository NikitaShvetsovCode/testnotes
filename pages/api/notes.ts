import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const dbPath = path.resolve('./db.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const notes = JSON.parse(data).notes;
    res.status(200).json(notes);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Both title and content are required.' });
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
    };

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    data.notes.push(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(data));

    res.status(201).json(newNote);
  } else if (req.method === 'PUT') {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
      res.status(400).json({ error: 'ID, title, and content are required for editing a note.' });
      return;
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const updatedNoteIndex = data.notes.findIndex((note: any) => note.id == id);

    if (updatedNoteIndex === -1) {
      res.status(404).json({ error: 'Note not found.' });
      return;
    }

    data.notes[updatedNoteIndex] = { id, title, content };

    fs.writeFileSync(dbPath, JSON.stringify(data));

    res.status(200).json(data.notes[updatedNoteIndex]);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: 'ID is required for deleting a note.' });
      return;
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const deletedNoteIndex = data.notes.findIndex((note: any) => note.id == id);

    if (deletedNoteIndex === -1) {
      res.status(404).json({ error: 'Note not found.' });
      return;
    }

    const deletedNote = data.notes.splice(deletedNoteIndex, 1)[0];

    fs.writeFileSync(dbPath, JSON.stringify(data));

    res.status(200).json({ message: 'Note deleted successfully.', deletedNote });
  } else {
    res.status(405).end();
  }
}
