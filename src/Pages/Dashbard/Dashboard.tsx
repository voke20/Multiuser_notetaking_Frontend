import React from "react";
import DashboardLayout from "../../Components/Layout/Layout";
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="dashboard-page">
                {/* Greeting */}
                <div className="greeting-section">
                    <h1>Good Morning, Alex</h1>
                    <p>Capture your thoughts, organize your world</p>
                </div>

                {/* Notes */}
                <div className="stat-grid">
                    <div className="stat-card">
                        <span className="stat-icon notes">🗒</span>
                        <div className="labels">
                            <p className="stat-label">TOTAL NOTES</p>
                            <h2 className="stat-value">124</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon shares">👥</span>
                        <div className="labels">
                            <p className="stat-label">SHARES</p>
                            <h2 className="stat-value">18</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon time">⏲</span>
                        <div className="labels">
                            <p className="stat-label">RECENT ACTIVITY</p>
                            <h2 className="stat-value">4</h2>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2>Recent Notes</h2>
                        <a href="/notes">View All</a>
                    </div>
                    <div className="notes-grid">
                        <div className="notes-card">
                            <div className="note-card-header">
                                <span className="note-tag research">RESEARCH</span>
                                <span className="note-time">2h ago</span>
                            </div>
                            <h3>Project X</h3>
                            <p>
                                This talks about the plan of 2026 and my journey through out the course of the year and achievements...
                            </p>
                        </div>

                        <div className="notes-card">
                            <div className="note-card-header">
                                <span className="note-tag idea">IDEA</span>
                                <span className="note-time">Yesterday</span>
                            </div>
                            <h3>Tech Pitch</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero obcaecati quas voluptatem a ab labore sint at in...
                            </p>
                        </div>

                        <div className="notes-card">
                            <div className="note-card-header">
                                <span className="note-tag">PROGRAMMING</span>
                                <span className="note-time">3 days ago</span>
                            </div>
                            <h3>Project Note App</h3>
                            <p>
                                Making use of Django and React to make a multiuser. note taking app where users can take notes and share via app...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2>Shared With Me</h2>
                        <a href="/notes" >View All</a>
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

                <button className="fab">+</button>
                
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;

