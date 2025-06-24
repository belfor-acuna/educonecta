import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const demoCredentials = [
    { role: 'Administrador', email: 'admin@educonecta.cl', password: 'admin123' },
    { role: 'Director', email: 'director@escuela1.cl', password: 'director123' },
    { role: 'Docente', email: 'docente1@escuela1.cl', password: 'docente123' },
    { role: 'Apoderado', email: 'apoderado1@gmail.com', password: 'apoderado123' }
  ];

  const fillCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return (
    <div className="container-main flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="heading-hero text-center">EduConecta Rural</h1>
          <p className="text-section text-center">
            Sistema de gestión académica para escuelas rurales
          </p>
        </div>

        {/* Formulario de login */}
        <div className="feature-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="usuario@educonecta.cl"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogIn size={20} />
              )}
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>

        {/* Credenciales de demo */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
            Credenciales de Demostración
          </h3>
          <div className="grid gap-3">
            {demoCredentials.map((cred, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => fillCredentials(cred.email, cred.password)}
              >
                <div className="font-medium text-gray-900">{cred.role}</div>
                <div className="text-sm text-gray-600">{cred.email}</div>
                <div className="text-xs text-gray-500">Clic para usar estas credenciales</div>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda? Contacta al administrador del sistema
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
