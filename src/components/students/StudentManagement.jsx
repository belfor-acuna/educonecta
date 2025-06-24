import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { students } from '../../data/mockData';
import { Calendar, Phone, AlertCircle } from 'lucide-react';

const StudentManagement = () => {
  const { user, isApoderado } = useAuth();

  const getStudents = () => {
    if (isApoderado) {
      return students.filter(s => user.students?.includes(s.id));
    }
    return students.filter(s => s.active);
  };

  const studentList = getStudents();

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">
          {isApoderado ? 'Mis Hijos' : 'Gestión de Estudiantes'}
        </h1>
        <p className="text-section">
          {isApoderado ? 'Información de tus hijos' : 'Administra los estudiantes del sistema'}
        </p>
      </div>

      <div className="content-body">
        <div className="grid gap-6">
          {studentList.map((student) => (
            <div key={student.id} className="feature-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="feature-card-title">
                    {student.name} {student.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">RUT: {student.rut}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {student.grade}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Nacimiento: {new Date(student.birthDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Dirección: {student.address}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Contacto de emergencia:</span>
                    <div>{student.emergencyContact}</div>
                    <div>{student.emergencyPhone}</div>
                  </div>
                  {student.medicalInfo && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle size={16} className="text-orange-400 mt-0.5" />
                      <span className="text-orange-700">{student.medicalInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {studentList.length === 0 && (
          <div className="feature-card text-center py-8">
            <p className="text-gray-500">No se encontraron estudiantes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
