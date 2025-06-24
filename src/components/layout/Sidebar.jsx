import React from 'react';
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
  UserCheck
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { user, logout, isAdmin, isDirector, isDocente, isApoderado } = useAuth();

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

  return (
    <div className="sidebar-container">
      {/* Logo */}
      <div className="sidebar-logo">
        <h2 className="text-xl font-bold text-white">EduConecta</h2>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-gray-600">
        <div className="text-white">
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-gray-300 capitalize">{user?.role}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`sidebar-link w-full text-left ${
                    isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="sidebar-link-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-600">
        <button
          onClick={logout}
          className="sidebar-link w-full text-left text-red-300 hover:text-red-100 hover:bg-red-600"
        >
          <LogOut size={20} />
          <span className="sidebar-link-label">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
