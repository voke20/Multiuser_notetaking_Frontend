export interface CategoryNote {
    id: string;
    category: 'PRODUCT' | 'IDEA' | 'RESEARCH';
    title: string;
    preview: string;
    timeAgo: string;
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