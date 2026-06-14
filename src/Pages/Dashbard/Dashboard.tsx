import React from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../Components/Layout/Layout";
import { GetDashboardStats } from "../../services/Dashboardservice";
import './Dashboard.css';
import type { NoteData } from "../../Type/type";
import { useNavigate } from "react-router-dom";
import { GetNotes } from "../../services/noteservices";
import useAuthStore from "../../store/authstore";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [totalNotes, setTotalNotes] = useState(0);
    const [sharedCount, setSharedCount] = useState(0);
    const [recentNotes, setRecentNotes] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData= async() => {
        try {
            setLoading(true);
            const [stats, notes] = await Promise.all([
            GetDashboardStats(),
            GetNotes(),
        ]);
        setTotalNotes(stats.totalNotes);
        setSharedCount(stats.sharedNotes);
        setRecentNotes(notes.slice(0, 3)); // show only 3 recent notes
        } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
        } finally {
        setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        });
    };

    const getGreeting = (): string => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const { email } = useAuthStore();

    const GetUsername= (): string => {
        if(!email) return '';
        return email.split('@')[0];
    };

    if (loading) return <DashboardLayout><p className="loading">Loading...</p></DashboardLayout>;
    if (error) return <DashboardLayout><p className="error-message">{error}</p></DashboardLayout>;


    return (
        <DashboardLayout>
            <div className="dashboard-page">
                <div className="greeting-section">
                    <h1> {getGreeting()} {GetUsername()}! </h1>
                    <p>Capture your thoughts, organize your world</p>
                </div>

                <div className="stat-grid">
                    <div className="stat-card">
                        <span className="stat-icon notes">🗒</span>
                        <div className="labels">
                            <p className="stat-label">TOTAL NOTES</p>
                            <h2 className="stat-value">{totalNotes}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon shares">🖄</span>
                        <div className="labels">
                            <p className="stat-label">SHARES</p>
                            <h2 className="stat-value">{sharedCount}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon time">⏲</span>
                        <div className="labels">
                            <p className="stat-label">RECENT ACTIVITY</p>
                            <h2 className="stat-value">{recentNotes.length} Today</h2>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2>Recent Notes</h2>
                        <a onClick={() => navigate('/notes')} style={{cursor: 'pointer'}} >View All</a>
                    </div>
                    {recentNotes.length === 0 ? (
                        <p className="empty-text">No notes yet. Create your first note!</p>
                    ) : (
                        <div className="notes-grid">
                            {recentNotes.map(note => (
                                <div
                                key={note.id}
                                className="note-card"
                                onClick={() => navigate(`/notes/${note.id}`)}
                                >
                                <h3>{note.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: note.content.substring(0, 80) + '...' }} />
                                <span className="note-time">{formatDate(note.update_at)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2>Shared With Me</h2>
                        <a href="/notes/shared" >View All</a>
                    </div>
                    <table className="shared-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>OWNER</th>
                                <th>LAST MODIFIED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Javascript Project</td>
                                <td>Victor</td>
                                <td>Today, 12:45pm</td>
                            </tr>
                            <tr>
                                <td>Academic Project</td>
                                <td>Emmanuel</td>
                                <td>May 14, 12:45pm</td>
                            </tr>
                        </tbody>
                    </table>

                    
                </div>

                <button className="fab" onClick={() => navigate('/notes/create')} >+</button>
                
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;

