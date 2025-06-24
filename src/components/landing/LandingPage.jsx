import React, { useState } from 'react';

const LandingPage = ({ onDemoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container-main">
      {/* Header */}
      <header className="header-main">
        <div className="container-section">
          <div className="header-container">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="header-logo">EduConecta Rural</h1>
              </div>
            </div>
            <div className="header-nav">
              <div className="header-nav-list">
                <a href="#inicio" className="header-nav-link">Inicio</a>
                <a href="#caracteristicas" className="header-nav-link">Características</a>
                <a href="#beneficios" className="header-nav-link">Beneficios</a>
                <a href="#contacto" className="header-nav-link">Contacto</a>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="header-mobile-btn"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="header-mobile-menu">
            <a href="#inicio" className="header-mobile-link">Inicio</a>
            <a href="#caracteristicas" className="header-mobile-link">Características</a>
            <a href="#beneficios" className="header-mobile-link">Beneficios</a>
            <a href="#contacto" className="header-mobile-link">Contacto</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="section-padding">
        <div className="container-section">
          <div className="text-center">
            <h1 className="heading-hero">
              Conectando la Educación Rural
            </h1>
            <p className="text-hero max-w-3xl mx-auto">
              Sistema integral para el monitoreo y gestión académica en escuelas rurales del sur de Chile, 
              diseñado para funcionar con conectividad limitada.
            </p>
            <div className="btn-group">
              <button className="btn-primary">
                Conocer Más
              </button>
              <button 
                onClick={onDemoClick}
                className="btn-secondary"
              >
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding section-bg-white">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="heading-section">
              El Desafío de la Educación Rural
            </h2>
            <p className="text-section max-w-3xl mx-auto">
              Las escuelas rurales del sur de Chile enfrentan desafíos únicos que requieren soluciones innovadoras
            </p>
          </div>
          <div className="grid-features">
            <div className="feature-card">
              <div className="feature-card-icon-error">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="feature-card-title">Baja Conectividad</h3>
              <p className="feature-card-description">Internet limitado o intermitente dificulta el acceso a herramientas digitales educativas</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Monitoreo Limitado</h3>
              <p className="feature-card-description">Dificultad para seguir el progreso académico y asistencia de estudiantes en tiempo real</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="feature-card-title">Recursos Limitados</h3>
              <p className="feature-card-description">Herramientas complejas y costosas que requieren formación técnica avanzada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="section-padding section-bg-gray">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="heading-section">
              Características Principales
            </h2>
            <p className="text-section max-w-3xl mx-auto">
              Un sistema completo diseñado específicamente para las necesidades de la educación rural
            </p>
          </div>
          <div className="grid-features">
            <div className="feature-card">
              <div className="feature-card-icon-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="feature-card-title">Gestión de Escuelas</h3>
              <p className="feature-card-description">Registro completo de escuelas rurales y sus docentes con información detallada y actualizable.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Fichas de Estudiantes</h3>
              <p className="feature-card-description">Perfiles completos con datos personales, rendimiento académico, asistencia y seguimiento personalizado.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="feature-card-title">Actividades Escolares</h3>
              <p className="feature-card-description">Herramientas para que los docentes carguen y gestionen actividades, tareas y evaluaciones.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-error">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Reportes Inteligentes</h3>
              <p className="feature-card-description">Informes automáticos de progreso por curso, escuela y región para todos los stakeholders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="feature-card-title">Sincronización Offline</h3>
              <p className="feature-card-description">Funciona sin internet y sincroniza automáticamente cuando hay conectividad disponible.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Acceso Familiar</h3>
              <p className="feature-card-description">Portal web y móvil para que las familias puedan seguir el progreso de sus hijos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="section-padding section-bg-primary">
        <div className="container-section text-center">
          <h2 className="heading-section text-white mb-4">
            ¿Quieres ver EduConecta en acción?
          </h2>
          <p className="text-hero text-blue-100 mb-8">
            Explora todas las funcionalidades del sistema con nuestra demostración interactiva
          </p>
          <button 
            onClick={onDemoClick}
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
          >
            Acceder a la Demostración
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-section">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">EduConecta Rural</h3>
            <p className="text-gray-300 mb-4">
              Transformando la educación rural a través de la tecnología
            </p>
            <p className="text-gray-300">
              © 2024 EduConecta Rural - Ministerio de Educación de Chile
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
