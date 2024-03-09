import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const dbPath = path.resolve('./db.json');

export default async function DELETE(req: any, res: any) {
  try {
    const { id } = req.body;

    console.log(id);

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

    await res.status(200).json({ message: 'Note deleted successfully.', deletedNote });
  } catch (error) {
    console.error('Ошибка из функции API', error);
  }
}
