import fetchclient from '../utils/fetchclient';

export const GetDashboardStats = async (filter: string= 'This Month') => {
  const [notes, sharedNotes, categories] = await Promise.all([
    fetchclient('/api/notes/', { method: 'GET' }),
    fetchclient('/api/notes/shared/', { method: 'GET' }),
    fetchclient('/api/notes/categories/', { method: 'GET' }),
  ]);

  const now = new Date();
  const filteredNotes = notes.filter((note: any) => {
    const noteDate = new Date(note.created_at);
    const diffDays = Math.floor((now.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24));

    if (filter === 'This Week') return diffDays <= 7;
    if (filter === 'This Month') return diffDays <= 30;
    if (filter === 'This Year') return diffDays <= 365;
    return true; // All Time
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = days.map(day => ({ day, count: 0 }));

  filteredNotes.forEach((note: any) => {
    const noteDate = new Date(note.created_at);
    const diffDays = Math.floor((now.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) {
      const dayIndex = noteDate.getDay();
      weeklyData[dayIndex].count += 1;
    }
  });

  return {
    totalNotes: notes.length,
    sharedNotes: sharedNotes.length,
    totalCategories: categories.length,
    weeklyNotes: weeklyData
  };
};