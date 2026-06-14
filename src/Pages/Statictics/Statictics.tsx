import React, { useState } from 'react';
import DashboardLayout from '../../Components/Layout/Layout';
import './Statictics.css';

const Statistics: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('This Month');
  const filters = ['This Week', 'This Month', 'This Year', 'All Time'];

  const stats = [
    { icon: '📄', label: 'Total Notes', value: '124', change: '+12 this month' },
    { icon: '👥', label: 'Notes Shared', value: '18', change: '+3 this week' },
    { icon: '📂', label: 'Categories', value: '8', change: '2 most active' },
    { icon: '📎', label: 'Attachments', value: '34', change: '+5 this month' },
  ];

  const recentActivity = [
    { action: 'Created', note: 'Project X Roadmap', time: '2 hours ago', icon: '✏️' },
    { action: 'Shared', note: 'Tech Pitch Deck', time: 'Yesterday', icon: '👥' },
    { action: 'Edited', note: 'Cognitive Load in UI', time: '2 days ago', icon: '📝' },
    { action: 'Uploaded', note: 'Architecture v2.pdf', time: '3 days ago', icon: '📎' },
    { action: 'Created', note: 'Meeting Notes', time: '1 week ago', icon: '✏️' },
  ];

  const topCategories = [
    { name: 'Research', count: 34, percentage: 80 },
    { name: 'Work', count: 28, percentage: 65 },
    { name: 'Personal', count: 22, percentage: 50 },
    { name: 'Drafts', count: 18, percentage: 40 },
    { name: 'Ideas', count: 12, percentage: 28 },
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

          {/* Top Categories */}
          <div className="stats-card">
            <h2>Top Categories</h2>
            <p>Most used note categories</p>
            <div className="categories-list">
              {topCategories.map((cat, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{cat.name}</span>
                    <span className="category-count">{cat.count} notes</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="stats-card activity-card">
            <h2>Recent Activity</h2>
            <p>Your latest actions</p>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-info">
                    <p className="activity-text">
                      <span>{activity.action}</span> — {activity.note}
                    </p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;