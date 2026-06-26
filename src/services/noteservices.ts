import fetchclient from "../utils/fetchclient";

export const GetNotes = async() => {
    return await fetchclient(`/api/notes/`, {method: 'GET'});
};

export const GetNoteById = async(id: number) => {
    return await fetchclient(`/api/notes/${id}`, {method: 'GET'});
};

export const CreateNote = async( data: {
    title: string;
    content: string;
    content_type: string;
    category?: number;
    is_pinned: boolean;
}) => {
    return await fetchclient(`/api/notes/`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const UpdateNote = async(noteId: number, data: {
    title?: string;
    content?: string;
    content_type?: string;
    category?: number;
    is_pinned?: boolean;
}) => {
    return await fetchclient(`/api/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
};

export const DeleteNote = async (id: number) => {
  return await fetchclient(`/api/notes/${id}/`, { method: 'DELETE' });
};

