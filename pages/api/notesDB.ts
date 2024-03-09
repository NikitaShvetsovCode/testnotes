import Note from './db/models/Notes';
import connectMongoDB from './db/index';

connectMongoDB();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Both title and content are required.' });
      return;
    }

    try {
      const newNote = await Note.create({ title, content });
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else if (req.method === 'PUT') {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
      res.status(400).json({ error: 'ID, updatedTitle, and updatedContent are required for editing a note.' });
      return;
    }

    try {
      const updatedNote = await Note.findByIdAndUpdate(id, { title: title, content: content }, { new: true });

      if (!updatedNote) {
        res.status(404).json({ error: 'Note not found.' });
        return;
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else if (req.method === 'DELETE') {
    const { deleteId } = req.body;

    if (!deleteId) {
      res.status(400).json({ error: 'deleteId is required for deleting a note.' });
      return;
    }

    try {
      const deletedNote = await Note.findByIdAndDelete(deleteId);

      if (!deletedNote) {
        res.status(404).json({ error: 'Note not found.' });
        return;
      }

      res.status(200).json({ message: 'Note deleted successfully.', deletedNote });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  } else {
    res.status(405).end();
  }
}
