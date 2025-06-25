import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../dashboard/Dashboard';
import UserManagement from '../users/UserManagement';
import SchoolManagement from '../schools/SchoolManagement';
import StudentManagement from '../students/StudentManagement';
import AttendanceManagement from '../attendance/AttendanceManagement';
import ActivityManagement from '../activities/ActivityManagement';
import GradeManagement from '../grades/GradeManagement';
import ReportManagement from '../reports/ReportManagement';
import MessageManagement from '../messages/MessageManagement';

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Manejar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      // En móviles, cerrar el menú si está abierto
      if (window.innerWidth < 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      // En desktop, cerrar el menú móvil si está abierto
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
      case 'teachers':
        return <UserManagement />;
      case 'schools':
        return <SchoolManagement />;
      case 'students':
      case 'children':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'activities':
        return <ActivityManagement />;
      case 'grades':
        return <GradeManagement />;
      case 'reports':
        return <ReportManagement />;
      case 'messages':
        return <MessageManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className={`main-content ${isMobileMenuOpen ? 'sidebar-mobile-open' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;
