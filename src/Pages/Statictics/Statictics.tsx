import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/Layout/Layout';
import { GetCategories, CreateCategory, DeleteCategory, UpdateCategory   } from '../../services/categoryservice';
import type { Category } from '../../Type/type';
import './Statictics.css'
const Statistics: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('This Month');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const filters = ['This Week', 'This Month', 'This Year', 'All Time'];

  const stats = [
    { icon: '📄', label: 'Total Notes', value: '124', change: '+12 this month' },
    { icon: '👥', label: 'Notes Shared', value: '18', change: '+3 this week' },
    { icon: '📂', label: 'Categories', value: categories.length.toString(), change: '' },
    { icon: '📎', label: 'Attachments', value: '34', change: '+5 this month' },
  ];

  const weeklyNotes = [
    { day: 'Mon', count: 4 },
    { day: 'Tue', count: 7 },
    { day: 'Wed', count: 3 },
    { day: 'Thu', count: 8 },
    { day: 'Fri', count: 5 },
    { day: 'Sat', count: 2 },
    { day: 'Sun', count: 1 },
  ];

  const maxCount = Math.max(...weeklyNotes.map(n => n.count));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await GetCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (id: number) => {
    try {
      await UpdateCategory(id, { name: editingName });
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: editingName } : cat
      ));
      setEditingId(null);
      setEditingName('');
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const data = await CreateCategory({ name: newCategoryName });
      setCategories([...categories, data]);
      setNewCategoryName('');
      setShowNewCategory(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await DeleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    }
  };

  return (
    <DashboardLayout>
      <div className="statistics-page">

        {/* Header */}
        <div className="stats-header">
          <div>
            <h1>Statistics</h1>
            <p>Track your note taking habits and productivity.</p>
          </div>
          <div className="filter-tabs">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h2 className="stat-value">{stat.value}</h2>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-bottom">

          {/* Weekly Chart */}
          <div className="stats-card">
            <h2>Notes Created This Week</h2>
            <p>Daily breakdown of your writing activity</p>
            <div className="bar-chart">
              {weeklyNotes.map((day, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${(day.count / maxCount) * 100}%` }}
                    >
                      <span className="bar-value">{day.count}</span>
                    </div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="stats-card">
            <div className="category-header">
              <div>
                <h2>Categories</h2>
                <p>Manage your note categories</p>
              </div>
              <button 
                className="add-cat-btn"
                onClick={() => setShowNewCategory(!showNewCategory)}
              >
                + Add
              </button>
            </div>

            {showNewCategory && (
              <div className="new-category-input">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Save</button>
                <button onClick={() => setShowNewCategory(false)}>Cancel</button>
              </div>
            )}

            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="categories-list">
                {categories.length === 0 ? (
                  <p className="empty-text">No categories yet. Add one!</p>
                ) : (
                  categories.map(cat => (
                    <div key={cat.id} className="category-item">
                      {editingId === cat.id ? (
                        // Edit mode
                        <div className="new-category-input">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                          />
                          <button onClick={() => handleUpdateCategory(cat.id)}>Save</button>
                          <button onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      ) : (
                        // View mode
                        <>
                          <span className="category-name">{cat.name}</span>
                          <div className="category-actions">
                            <button 
                              className="action-btn edit" 
                              onClick={() => {
                                setEditingId(cat.id);
                                setEditingName(cat.name);
                              }}
                            >
                              ✏️
                            </button>
                            <button 
                              className="action-btn delete" 
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;