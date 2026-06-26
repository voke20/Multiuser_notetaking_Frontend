export interface Category {
    id: number;
    name:string;
    description?: string;
    owner: string;
    
}

export interface NoteEditorProps {
  mode: 'create' | 'edit';
  noteId?: number;
}

export interface UserData {   
  name: string;
}

export interface SidebarData {
  icon: string;
  label: string;
  path: string;
}

export interface LayoutProps {
  children: React.ReactNode
}

export interface NoteData {
  id: number;
  title: string;
  content: string;
  content_type: string;
  category?: number | null;
  is_pinned: boolean;
  owner: string;
  created_at: string;
  update_at: string;
}