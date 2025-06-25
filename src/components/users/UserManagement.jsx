import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { users } from '../../data/mockData';

const UserManagement = () => {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole && u.active;
  });

  const getRoleLabel = (role) => {
    const roles = {
      admin: 'Administrador',
      director: 'Director',
      docente: 'Docente',
      apoderado: 'Apoderado'
    };
    return roles[role] || role;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      director: 'bg-blue-100 text-blue-800',
      docente: 'bg-green-100 text-green-800',
      apoderado: 'bg-yellow-100 text-yellow-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      {/* Header */}
      <div className="content-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="heading-section">Gestión de Usuarios</h1>
            <p className="text-section">
              {isAdmin ? 'Administra todos los usuarios del sistema' : 'Gestiona los docentes de tu escuela'}
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary btn-icon"
            >
              <Plus size={20} />
              Nuevo Usuario
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="content-body">
        {/* Filters */}
        <div className="feature-card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="form-select"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="director">Directores</option>
                <option value="docente">Docentes</option>
                <option value="apoderado">Apoderados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="feature-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Usuario</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rol</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contacto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userItem) => (
                  <tr key={userItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{userItem.name}</div>
                        <div className="text-sm text-gray-500">{userItem.rut}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(userItem.role)}`}>
                        {getRoleLabel(userItem.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm text-gray-900">{userItem.email}</div>
                        <div className="text-sm text-gray-500">{userItem.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${userItem.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {userItem.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        {isAdmin && userItem.id !== user.id && (
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Nuevo Usuario</h3>
            <p className="text-gray-600 mb-4">
              Funcionalidad de registro de usuarios en desarrollo...
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
