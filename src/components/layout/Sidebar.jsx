import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Users,
  School,
  GraduationCap,
  Calendar,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  BookOpen,
  UserCheck,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({
  activeSection,
  setActiveSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { user, logout, isAdmin, isDirector, isDocente, isApoderado } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    if (isAdmin) {
      return [
        ...baseItems,
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'schools', label: 'Escuelas', icon: School },
        { id: 'students', label: 'Estudiantes', icon: GraduationCap },
        { id: 'reports', label: 'Reportes', icon: BarChart3 },
        { id: 'settings', label: 'Configuración', icon: Settings }
      ];
    }

    if (isDirector) {
      return [
        ...baseItems,
        { id: 'teachers', label: 'Docentes', icon: Users },
        { id: 'students', label: 'Estudiantes', icon: GraduationCap },
        { id: 'attendance', label: 'Asistencia', icon: UserCheck },
        { id: 'activities', label: 'Actividades', icon: Calendar },
        { id: 'grades', label: 'Calificaciones', icon: ClipboardList },
        { id: 'reports', label: 'Reportes', icon: BarChart3 },
        { id: 'messages', label: 'Mensajes', icon: MessageSquare }
      ];
    }

    if (isDocente) {
      return [
        ...baseItems,
        { id: 'students', label: 'Mis Estudiantes', icon: GraduationCap },
        { id: 'attendance', label: 'Asistencia', icon: UserCheck },
        { id: 'activities', label: 'Actividades', icon: Calendar },
        { id: 'grades', label: 'Calificaciones', icon: ClipboardList },
        { id: 'messages', label: 'Mensajes', icon: MessageSquare }
      ];
    }

    if (isApoderado) {
      return [
        ...baseItems,
        { id: 'children', label: 'Mis Hijos', icon: GraduationCap },
        { id: 'grades', label: 'Calificaciones', icon: BookOpen },
        { id: 'attendance', label: 'Asistencia', icon: UserCheck },
        { id: 'activities', label: 'Actividades', icon: Calendar },
        { id: 'messages', label: 'Mensajes', icon: MessageSquare }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const handleMenuItemClick = (itemId) => {
    setActiveSection(itemId);
    // En móviles, cerrar el menú después de seleccionar
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay - Solo cuando está expandida */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isMobileMenuOpen ? 'sidebar-mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        {(!isMobile || isMobileMenuOpen) && (
          <h2 className="text-xl font-bold text-white">EduConecta</h2>
        )}
        {isMobile && !isMobileMenuOpen && (
          <h2 className="text-lg font-bold text-white">EC</h2>
        )}
      </div>

      {/* User info */}
      {(!isMobile || isMobileMenuOpen) && (
        <div className="px-4 py-4 border-b border-gray-600">
          <div className="text-white">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-gray-300 capitalize">{user?.role}</div>
          </div>
        </div>
      )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`sidebar-link w-full text-left ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    title={(isMobile && !isMobileMenuOpen) ? item.label : ''}
                  >
                    <Icon size={20} />
                    {(!isMobile || isMobileMenuOpen) && <span className="sidebar-link-label">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      {/* Salir del Demo */}
      <div className="px-4 py-2">
        <button
          onClick={() => {
            // Cerrar sesión y volver a la landing page
            logout();
            // Recargar la página para asegurar que se resetee todo el estado
            window.location.href = '/';
          }}
          className="sidebar-link w-full text-left text-blue-300 hover:text-blue-100 hover:bg-blue-600"
          title={(isMobile && !isMobileMenuOpen) ? 'Salir del Demo' : ''}
        >
          <Home size={20} />
          {(!isMobile || isMobileMenuOpen) && <span className="sidebar-link-label">Salir del Demo</span>}
        </button>
      </div>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-600">
        <button
          onClick={logout}
          className="sidebar-link w-full text-left text-red-300 hover:text-red-100 hover:bg-red-600"
          title={(isMobile && !isMobileMenuOpen) ? 'Cerrar Sesión' : ''}
        >
          <LogOut size={20} />
          {(!isMobile || isMobileMenuOpen) && <span className="sidebar-link-label">Cerrar Sesión</span>}
        </button>
      </div>

      {/* Toggle button - Solo en móviles */}
      {isMobile && (
        <div className="sidebar-collapse-toggle">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sidebar-collapse-btn"
            title={isMobileMenuOpen ? 'Contraer menú' : 'Expandir menú'}
          >
            {isMobileMenuOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Sidebar;
