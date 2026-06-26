import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import './Layout.css';
import type { LayoutProps } from '../../Type/type';

const DashboardLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-main">
                <Navbar />
                <div className="dashboard-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
