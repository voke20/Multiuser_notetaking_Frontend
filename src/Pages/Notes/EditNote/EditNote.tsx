import React from 'react';
import { useParams } from 'react-router-dom';
import NoteEditor from '../../../Components/NoteEditor/NoteEditor';
const EditNote: React.FC = () => {
  const { id } = useParams();
  return <NoteEditor mode="edit" noteId={Number(id)} />;
};

export default EditNote;