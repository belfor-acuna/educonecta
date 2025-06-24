import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Check, X, Clock } from 'lucide-react';
import { students, attendance } from '../../data/mockData';

const AttendanceManagement = () => {
  const { user, isDocente, isApoderado } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getStudentsForAttendance = () => {
    if (isApoderado) {
      return students.filter(s => user.students?.includes(s.id));
    }
    return students.filter(s => s.schoolId === user.schoolId && s.active);
  };

  const getAttendanceForDate = (studentId, date) => {
    return attendance.find(a => a.studentId === studentId && a.date === date);
  };

  const studentList = getStudentsForAttendance();

  const getAttendanceStats = () => {
    const totalStudents = studentList.length;
    const presentCount = attendance.filter(a => 
      a.date === selectedDate && a.status === 'presente'
    ).length;
    const absentCount = attendance.filter(a => 
      a.date === selectedDate && a.status === 'ausente'
    ).length;

    return {
      total: totalStudents,
      present: presentCount,
      absent: absentCount,
      pending: totalStudents - presentCount - absentCount
    };
  };

  const stats = getAttendanceStats();

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">
          {isApoderado ? 'Asistencia de mis Hijos' : 'Gestión de Asistencia'}
        </h1>
        <p className="text-section">
          {isApoderado ? 'Revisa la asistencia de tus hijos' : 'Registra y consulta la asistencia diaria'}
        </p>
      </div>

      <div className="content-body">
        {/* Date Selector */}
        <div className="feature-card mb-6">
          <div className="flex items-center gap-4">
            <Calendar size={20} className="text-gray-400" />
            <div>
              <label htmlFor="date" className="form-label">Fecha</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="feature-card text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="feature-card text-center">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-gray-600">Presentes</div>
          </div>
          <div className="feature-card text-center">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-gray-600">Ausentes</div>
          </div>
          <div className="feature-card text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="feature-card">
          <h3 className="feature-card-title mb-4">
            Asistencia del {new Date(selectedDate).toLocaleDateString()}
          </h3>
          
          <div className="space-y-3">
            {studentList.map((student) => {
              const attendanceRecord = getAttendanceForDate(student.id, selectedDate);
              
              return (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {student.name} {student.lastName}
                      </div>
                      <div className="text-sm text-gray-600">{student.grade}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {attendanceRecord ? (
                      <div className="flex items-center gap-2">
                        {attendanceRecord.status === 'presente' ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check size={16} />
                            <span className="text-sm">Presente</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <X size={16} />
                            <span className="text-sm">Ausente</span>
                          </div>
                        )}
                        {attendanceRecord.observations && (
                          <span className="text-xs text-gray-500 ml-2">
                            {attendanceRecord.observations}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock size={16} />
                        <span className="text-sm">Pendiente</span>
                      </div>
                    )}

                    {isDocente && (
                      <div className="flex gap-1 ml-4">
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                          <Check size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {studentList.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay estudiantes para mostrar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
