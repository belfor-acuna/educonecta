import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  School, 
  GraduationCap, 
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { schools, students, users, activities, messages } from '../../data/mockData';

const Dashboard = () => {
  const { user, isAdmin, isDirector, isDocente, isApoderado } = useAuth();

  const getStats = () => {
    if (isAdmin) {
      return [
        {
          title: 'Total Escuelas',
          value: schools.filter(s => s.active).length,
          icon: School,
          color: 'blue'
        },
        {
          title: 'Total Usuarios',
          value: users.filter(u => u.active).length,
          icon: Users,
          color: 'green'
        },
        {
          title: 'Total Estudiantes',
          value: students.filter(s => s.active).length,
          icon: GraduationCap,
          color: 'purple'
        },
        {
          title: 'Actividades Activas',
          value: activities.filter(a => a.status === 'activa').length,
          icon: Calendar,
          color: 'orange'
        }
      ];
    }

    if (isDirector || isDocente) {
      const schoolStudents = students.filter(s => s.schoolId === user.schoolId && s.active);
      return [
        {
          title: 'Estudiantes',
          value: schoolStudents.length,
          icon: GraduationCap,
          color: 'blue'
        },
        {
          title: 'Actividades Hoy',
          value: activities.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
          icon: Calendar,
          color: 'green'
        },
        {
          title: 'Mensajes Nuevos',
          value: messages.filter(m => m.toId === user.id && !m.read).length,
          icon: MessageSquare,
          color: 'purple'
        },
        {
          title: 'Asistencia Promedio',
          value: '87%',
          icon: TrendingUp,
          color: 'orange'
        }
      ];
    }

    if (isApoderado) {
      const myChildren = students.filter(s => user.students?.includes(s.id));
      return [
        {
          title: 'Mis Hijos',
          value: myChildren.length,
          icon: GraduationCap,
          color: 'blue'
        },
        {
          title: 'Actividades Pendientes',
          value: activities.filter(a => a.status === 'activa').length,
          icon: Calendar,
          color: 'orange'
        },
        {
          title: 'Mensajes Nuevos',
          value: messages.filter(m => m.toId === user.id && !m.read).length,
          icon: MessageSquare,
          color: 'purple'
        },
        {
          title: 'Promedio General',
          value: '6.2',
          icon: TrendingUp,
          color: 'green'
        }
      ];
    }

    return [];
  };

  const getRecentActivities = () => {
    if (isApoderado) {
      return [
        { type: 'grade', message: 'Nueva calificación en Matemáticas para Sofía', time: '2 horas' },
        { type: 'message', message: 'Mensaje de la profesora Ana Martínez', time: '1 día' },
        { type: 'activity', message: 'Nueva tarea de Ciencias asignada', time: '2 días' }
      ];
    }

    return [
      { type: 'attendance', message: 'Asistencia registrada para 5° Básico', time: '1 hora' },
      { type: 'grade', message: 'Calificaciones ingresadas para Matemáticas', time: '3 horas' },
      { type: 'message', message: 'Nuevo mensaje de apoderado', time: '5 horas' },
      { type: 'activity', message: 'Actividad programada para mañana', time: '1 día' }
    ];
  };

  const stats = getStats();
  const recentActivities = getRecentActivities();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div>
      {/* Header */}
      <div className="content-header">
        <h1 className="heading-section">
          {getGreeting()}, {user?.name}
        </h1>
        <p className="text-section">
          Bienvenido al sistema EduConecta Rural
        </p>
      </div>

      {/* Content */}
      <div className="content-body">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="feature-card">
                <div className={`feature-card-icon-${stat.color === 'blue' ? 'primary' : stat.color === 'green' ? 'secondary' : 'accent'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="feature-card-title">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="feature-card">
            <h3 className="feature-card-title mb-4">Actividades Recientes</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'grade' && <CheckCircle size={16} className="text-green-500" />}
                    {activity.type === 'message' && <MessageSquare size={16} className="text-blue-500" />}
                    {activity.type === 'activity' && <Calendar size={16} className="text-orange-500" />}
                    {activity.type === 'attendance' && <Users size={16} className="text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">Hace {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="feature-card">
            <h3 className="feature-card-title mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              {isDocente && (
                <>
                  <button className="btn-primary w-full text-left">
                    Registrar Asistencia
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Crear Nueva Actividad
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Ingresar Calificaciones
                  </button>
                </>
              )}
              {isDirector && (
                <>
                  <button className="btn-primary w-full text-left">
                    Ver Reportes
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Gestionar Docentes
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Revisar Asistencia
                  </button>
                </>
              )}
              {isApoderado && (
                <>
                  <button className="btn-primary w-full text-left">
                    Ver Calificaciones
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Enviar Mensaje
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Ver Asistencia
                  </button>
                </>
              )}
              {isAdmin && (
                <>
                  <button className="btn-primary w-full text-left">
                    Gestionar Usuarios
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Ver Reportes Generales
                  </button>
                  <button className="btn-secondary w-full text-left">
                    Configurar Sistema
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
