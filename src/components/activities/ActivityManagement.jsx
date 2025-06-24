import React from 'react';
import { activities } from '../../data/mockData';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const ActivityManagement = () => {
  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'evaluacion': return <BookOpen size={16} className="text-red-500" />;
      case 'tarea': return <Clock size={16} className="text-blue-500" />;
      default: return <Calendar size={16} className="text-green-500" />;
    }
  };

  const getActivityTypeBadge = (type) => {
    const badges = {
      evaluacion: 'bg-red-100 text-red-800',
      tarea: 'bg-blue-100 text-blue-800',
      clase: 'bg-green-100 text-green-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">Gestión de Actividades</h1>
        <p className="text-section">Administra clases, tareas y evaluaciones</p>
      </div>

      <div className="content-body">
        <div className="grid gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="feature-card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getActivityTypeIcon(activity.type)}
                  <h3 className="feature-card-title">{activity.title}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getActivityTypeBadge(activity.type)}`}>
                  {activity.type}
                </span>
              </div>

              <p className="text-gray-600 mb-3">{activity.description}</p>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Asignatura:</span>
                  <div className="font-medium">{activity.subject}</div>
                </div>
                <div>
                  <span className="text-gray-500">Curso:</span>
                  <div className="font-medium">{activity.grade}</div>
                </div>
                <div>
                  <span className="text-gray-500">Fecha límite:</span>
                  <div className="font-medium">{new Date(activity.dueDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;
