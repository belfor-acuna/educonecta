import React from 'react';
import { schools } from '../../data/mockData';
import { MapPin, Phone, Mail, Users } from 'lucide-react';

const SchoolManagement = () => {
  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">Gestión de Escuelas</h1>
        <p className="text-section">Administra las escuelas rurales del sistema</p>
      </div>

      <div className="content-body">
        <div className="grid gap-6">
          {schools.map((school) => (
            <div key={school.id} className="feature-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="feature-card-title">{school.name}</h3>
                  <p className="text-sm text-gray-600">RBD: {school.rbd}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  school.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {school.active ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{school.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{school.commune}, {school.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span>{school.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span>{school.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span>{school.totalStudents} estudiantes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span>{school.totalTeachers} docentes</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Director: {school.director}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Conectividad: {school.connectivity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
