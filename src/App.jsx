import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/landing/LandingPage';
import Login from './components/auth/Login';
import MainLayout from './components/layout/MainLayout';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [showDemo, setShowDemo] = useState(false);

  if (loading) {
    return (
      <div className="container-main flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado y no quiere ver la demo, mostrar landing
  if (!isAuthenticated && !showDemo) {
    return <LandingPage onDemoClick={() => setShowDemo(true)} />;
  }

  // Si no está autenticado pero quiere ver la demo, mostrar login
  if (!isAuthenticated && showDemo) {
    return (
      <div>
        {/* Botón para volver a la landing */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setShowDemo(false)}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Inicio
          </button>
        </div>
        <Login />
      </div>
    );
  }

  // Si está autenticado, mostrar la aplicación principal
  return (
    <div>
      {/* Botón para cerrar sesión y volver a la landing */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            setShowDemo(false);
            // Aquí podrías agregar logout si quieres
          }}
          className="btn-secondary flex items-center gap-2 bg-white shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver a Inicio
        </button>
      </div>
      <MainLayout />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;