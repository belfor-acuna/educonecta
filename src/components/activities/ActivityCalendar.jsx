import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../context/AuthContext';
import { activities, schools, students } from '../../data/mockData';
import {
  Clock,
  MapPin,
  Users,
  BookOpen,
  Calendar as CalendarIcon,
  Plus,
  Filter,
  Eye
} from 'lucide-react';

// Configurar moment en español
moment.locale('es');
const localizer = momentLocalizer(moment);

// Datos de ejemplo para el calendario
const sampleEvents = [
  {
    id: 1,
    title: 'Clase de Matemáticas',
    start: new Date(2025, 5, 25, 9, 0), // 25 junio 2025, 9:00 AM
    end: new Date(2025, 5, 25, 10, 0), // 25 junio 2025, 10:00 AM
    resource: {
      type: 'clase',
      subject: 'Matemáticas',
      grade: '5° Básico',
      location: 'Aula 1',
      color: '#10b981',
      description: 'Operaciones con números decimales y fracciones'
    }
  },
  {
    id: 2,
    title: 'Clase de Lenguaje',
    start: new Date(2025, 5, 25, 11, 0), // 25 junio 2025, 11:00 AM
    end: new Date(2025, 5, 25, 12, 0), // 25 junio 2025, 12:00 PM
    resource: {
      type: 'clase',
      subject: 'Lenguaje y Comunicación',
      grade: '5° Básico',
      location: 'Aula 1',
      color: '#10b981',
      description: 'Comprensión lectora y análisis de textos narrativos'
    }
  },
  {
    id: 3,
    title: 'Evaluación de Historia',
    start: new Date(2025, 5, 26, 10, 0), // 26 junio 2025, 10:00 AM
    end: new Date(2025, 5, 26, 11, 30), // 26 junio 2025, 11:30 AM
    resource: {
      type: 'evaluacion',
      subject: 'Historia',
      grade: '4° Básico',
      location: 'Aula 2',
      color: '#ef4444',
      description: 'Evaluación sobre pueblos originarios de Chile'
    }
  },
  {
    id: 4,
    title: 'Clase de Ciencias',
    start: new Date(2025, 5, 26, 14, 0), // 26 junio 2025, 2:00 PM
    end: new Date(2025, 5, 26, 15, 0), // 26 junio 2025, 3:00 PM
    resource: {
      type: 'clase',
      subject: 'Ciencias Naturales',
      grade: '4° Básico',
      location: 'Laboratorio',
      color: '#10b981',
      description: 'Experimento: Estados de la materia'
    }
  },
  {
    id: 5,
    title: 'Tarea de Matemáticas',
    start: new Date(2025, 5, 27, 8, 0), // 27 junio 2025, 8:00 AM
    end: new Date(2025, 5, 30, 23, 59), // 30 junio 2025, 11:59 PM
    resource: {
      type: 'tarea',
      subject: 'Matemáticas',
      grade: '5° Básico',
      location: 'Casa',
      color: '#3b82f6',
      description: 'Ejercicios de multiplicación y división con decimales'
    }
  },
  {
    id: 6,
    title: 'Evaluación de Ciencias',
    start: new Date(2025, 5, 27, 9, 0), // 27 junio 2025, 9:00 AM
    end: new Date(2025, 5, 27, 10, 30), // 27 junio 2025, 10:30 AM
    resource: {
      type: 'evaluacion',
      subject: 'Ciencias Naturales',
      grade: '5° Básico',
      location: 'Aula 1',
      color: '#ef4444',
      description: 'Evaluación sobre el sistema solar y planetas'
    }
  },
  {
    id: 7,
    title: 'Clase de Arte',
    start: new Date(2025, 5, 27, 15, 0), // 27 junio 2025, 3:00 PM
    end: new Date(2025, 5, 27, 16, 0), // 27 junio 2025, 4:00 PM
    resource: {
      type: 'clase',
      subject: 'Artes Visuales',
      grade: '4° Básico',
      location: 'Sala de Arte',
      color: '#10b981',
      description: 'Técnicas de pintura con acuarela'
    }
  },
  {
    id: 8,
    title: 'Reunión de Apoderados',
    start: new Date(2025, 5, 30, 19, 0), // 30 junio 2025, 7:00 PM
    end: new Date(2025, 5, 30, 20, 30), // 30 junio 2025, 8:30 PM
    resource: {
      type: 'reunion',
      subject: 'General',
      grade: '5° Básico',
      location: 'Aula Magna',
      color: '#8b5cf6',
      description: 'Reunión mensual para revisar avances académicos del primer semestre'
    }
  },
  {
    id: 9,
    title: 'Clase de Educación Física',
    start: new Date(2025, 6, 1, 10, 0), // 1 julio 2025, 10:00 AM
    end: new Date(2025, 6, 1, 11, 0), // 1 julio 2025, 11:00 AM
    resource: {
      type: 'clase',
      subject: 'Educación Física',
      grade: '5° Básico',
      location: 'Patio',
      color: '#10b981',
      description: 'Deportes colectivos: fútbol y básquetbol'
    }
  },
  {
    id: 10,
    title: 'Tarea de Historia',
    start: new Date(2025, 6, 1, 14, 0), // 1 julio 2025, 2:00 PM
    end: new Date(2025, 6, 4, 23, 59), // 4 julio 2025, 11:59 PM
    resource: {
      type: 'tarea',
      subject: 'Historia',
      grade: '4° Básico',
      location: 'Casa',
      color: '#3b82f6',
      description: 'Investigación sobre tradiciones de la región del Maule'
    }
  },
  {
    id: 11,
    title: 'Clase de Música',
    start: new Date(2025, 6, 2, 11, 0), // 2 julio 2025, 11:00 AM
    end: new Date(2025, 6, 2, 12, 0), // 2 julio 2025, 12:00 PM
    resource: {
      type: 'clase',
      subject: 'Música',
      grade: '4° Básico',
      location: 'Sala de Música',
      color: '#10b981',
      description: 'Práctica de instrumentos andinos: quena y charango'
    }
  },
  {
    id: 12,
    title: 'Evaluación de Lenguaje',
    start: new Date(2025, 6, 3, 9, 0), // 3 julio 2025, 9:00 AM
    end: new Date(2025, 6, 3, 10, 30), // 3 julio 2025, 10:30 AM
    resource: {
      type: 'evaluacion',
      subject: 'Lenguaje y Comunicación',
      grade: '5° Básico',
      location: 'Aula 1',
      color: '#ef4444',
      description: 'Evaluación de comprensión lectora y producción de textos'
    }
  },
  {
    id: 13,
    title: 'Clase de Tecnología',
    start: new Date(2025, 6, 3, 14, 0), // 3 julio 2025, 2:00 PM
    end: new Date(2025, 6, 3, 15, 0), // 3 julio 2025, 3:00 PM
    resource: {
      type: 'clase',
      subject: 'Tecnología',
      grade: '5° Básico',
      location: 'Sala de Computación',
      color: '#10b981',
      description: 'Introducción a la programación con Scratch'
    }
  }
];

// Mensajes en español para el calendario
const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Actividad',
  noEventsInRange: 'No hay actividades en este rango de fechas.',
  showMore: total => `+ Ver más (${total})`
};

const ActivityCalendar = () => {
  const { user, isDocente, isApoderado, isDirector } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Filtrar actividades según el usuario
  const filteredActivities = useMemo(() => {
    let userActivities = activities;

    // Filtrar por usuario
    if (isDocente) {
      userActivities = activities.filter(activity =>
        activity.teacherId === user.id && activity.schoolId === user.schoolId
      );
    } else if (isApoderado) {
      // Para apoderados, mostrar actividades de sus hijos
      const myChildren = students.filter(s => user.students?.includes(s.id));
      const childrenGrades = myChildren.map(child => child.grade);
      userActivities = activities.filter(activity =>
        childrenGrades.includes(activity.grade)
      );
    } else if (isDirector) {
      userActivities = activities.filter(activity =>
        activity.schoolId === user.schoolId
      );
    }

    // Filtrar por tipo si se selecciona
    if (filterType !== 'all') {
      userActivities = userActivities.filter(activity => activity.type === filterType);
    }

    return userActivities;
  }, [user, isDocente, isApoderado, isDirector, filterType]);

  // Usar eventos de ejemplo por ahora
  const calendarEvents = sampleEvents.map(event => ({
    ...event,
    style: {
      backgroundColor: event.resource.color,
      borderColor: event.resource.color,
      color: 'white'
    },
    className: `event-${event.resource.type}`
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    if (isDocente || isDirector) {
      // Aquí se podría abrir un modal para crear nueva actividad
      console.log('Crear nueva actividad:', { start, end });
    }
  };

  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'evaluacion': return <BookOpen size={16} className="text-red-500" />;
      case 'tarea': return <Clock size={16} className="text-blue-500" />;
      case 'clase': return <Users size={16} className="text-green-500" />;
      case 'reunion': return <CalendarIcon size={16} className="text-purple-500" />;
      default: return <CalendarIcon size={16} className="text-gray-500" />;
    }
  };

  const getActivityTypeBadge = (type) => {
    const badges = {
      evaluacion: 'bg-red-100 text-red-800',
      tarea: 'bg-blue-100 text-blue-800',
      clase: 'bg-green-100 text-green-800',
      reunion: 'bg-purple-100 text-purple-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  const getSchoolName = (schoolId) => {
    const school = schools.find(s => s.id === schoolId);
    return school ? school.name : 'Escuela no encontrada';
  };

  return (
    <div>
      {/* Header */}
      <div className="content-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="heading-section">Calendario de Actividades</h1>
            <p className="text-section">
              {isDocente && 'Gestiona tus clases, evaluaciones y tareas'}
              {isApoderado && 'Actividades de tus hijos'}
              {isDirector && 'Actividades de la escuela'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Filtro por tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select"
            >
              <option value="all">Todas las actividades</option>
              <option value="clase">Clases</option>
              <option value="evaluacion">Evaluaciones</option>
              <option value="tarea">Tareas</option>
              <option value="reunion">Reuniones</option>
            </select>

            {(isDocente || isDirector) && (
              <button className="btn-primary btn-icon">
                <Plus size={20} />
                Nueva Actividad
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-body">
        {/* Calendario */}
        <div className="feature-card" style={{ height: '600px' }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            titleAccessor={(event) => event.title}
            messages={messages}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable={isDocente || isDirector}
            popup
            style={{ height: '100%' }}
            eventPropGetter={(event) => ({
              style: event.style,
              className: event.className
            })}
            components={{
              agenda: {
                event: ({ event }) => (
                  <div className={`agenda-event ${event.className}`}>
                    <div className="agenda-event-title">{event.title}</div>
                    <div className="agenda-event-details">
                      {event.resource.subject} - {event.resource.grade}
                      {event.resource.location && ` - ${event.resource.location}`}
                    </div>
                  </div>
                )
              }
            }}
          />
        </div>

        {/* Leyenda */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div className="feature-card text-center">
            <div className="w-4 h-4 bg-green-500 rounded mx-auto mb-2"></div>
            <span className="text-sm font-medium">Clases</span>
          </div>
          <div className="feature-card text-center">
            <div className="w-4 h-4 bg-red-500 rounded mx-auto mb-2"></div>
            <span className="text-sm font-medium">Evaluaciones</span>
          </div>
          <div className="feature-card text-center">
            <div className="w-4 h-4 bg-blue-500 rounded mx-auto mb-2"></div>
            <span className="text-sm font-medium">Tareas</span>
          </div>
          <div className="feature-card text-center">
            <div className="w-4 h-4 bg-purple-500 rounded mx-auto mb-2"></div>
            <span className="text-sm font-medium">Reuniones</span>
          </div>
        </div>
      </div>

      {/* Modal de detalles de actividad */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                {getActivityTypeIcon(selectedEvent.type)}
                <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActivityTypeBadge(selectedEvent.type)}`}>
                  {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                </span>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Descripción</h4>
                <p className="text-gray-600">{selectedEvent.description || selectedEvent.resource?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Asignatura</h4>
                  <p className="text-gray-600">{selectedEvent.subject}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Curso</h4>
                  <p className="text-gray-600">{selectedEvent.grade}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Horario</h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span>
                    {moment(selectedEvent.startDate).format('DD/MM/YYYY HH:mm')} -
                    {moment(selectedEvent.endDate).format('HH:mm')}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Ubicación</h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Escuela</h4>
                <p className="text-gray-600">{getSchoolName(selectedEvent.schoolId)}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cerrar
              </button>
              {(isDocente || isDirector) && (
                <button className="btn-primary btn-icon">
                  <Eye size={16} />
                  Ver Detalles
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;
