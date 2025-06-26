import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { students } from '../../data/mockData';
import { Calendar, Phone, AlertCircle, User, Award, Smile, BookOpen, Users, Star, Trophy, Heart, Activity, Bookmark, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const StudentManagement = () => {
  const { user, isApoderado } = useAuth();
  const [recapOpen, setRecapOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const recapRef = useRef();

  // Datos extendidos para el recap de cada estudiante
  const studentRecapData = {
    1: {
      actividadesTotales: 24,
      premios: 5,
      asistencia: 97.5,
      faltas: 3,
      promedioGeneral: 6.7,
      mejorRamo: { nombre: "Matemáticas", nota: 7.0 },
      peorRamo: { nombre: "Historia", nota: 6.2 },
      proyectosLiderados: 4,
      compañerosAyudados: 9,
      premiosDetalle: [
        "Excelencia académica",
        "Mejor proyecto científico",
        "Espíritu deportivo"
      ],
      mejorAmigo: "Camila Torres",
      actividadesConAmigo: 8,
      mensajeProfesores: "Juan ha demostrado un crecimiento excepcional en matemáticas y ha mejorado notablemente su trabajo en equipo. ¡Sigue así!",
      logroDestacado: "Ganó la competencia intercolegial de matemáticas",
      fortalezaPrincipal: "Capacidad de análisis y resolución de problemas",
      metaCumplida: "Mejorar su promedio en 0.5 puntos (lo logró!)",
      eventoFavorito: "Feria científica anual",
      fotoEvento: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80"
    },
    // ... datos para otros estudiantes
  };

  const getStudents = () => {
    if (isApoderado) {
      return students.filter(s => user.students?.includes(s.id));
    }
    return students.filter(s => s.active);
  };

  const studentList = getStudents();

  const openRecap = (student) => {
    setSelectedStudent(student);
    setSlideIndex(0);
    setRecapOpen(true);
  };
  
  const closeRecap = () => {
    setRecapOpen(false);
    setSelectedStudent(null);
  };
  
  const nextSlide = () => {
    setSlideIndex((i) => (i + 1) % recapSlides.length);
  };
  
  const prevSlide = () => {
    setSlideIndex((i) => (i - 1 + recapSlides.length) % recapSlides.length);
  };

  // Slides personalizados con datos del estudiante
  const recapSlides = selectedStudent ? [
    {
      title: `¡El año de ${selectedStudent.name} en números!`,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Activity className="mx-auto text-purple-600 mb-2" />
            <p className="font-bold text-xl">{studentRecapData[selectedStudent.id].actividadesTotales}</p>
            <p className="text-sm">Actividades</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <Award className="mx-auto text-yellow-600 mb-2" />
            <p className="font-bold text-xl">{studentRecapData[selectedStudent.id].premios}</p>
            <p className="text-sm">Premios</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Calendar className="mx-auto text-green-600 mb-2" />
            <p className="font-bold text-xl">{studentRecapData[selectedStudent.id].asistencia}%</p>
            <p className="text-sm">Asistencia</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <BookOpen className="mx-auto text-blue-600 mb-2" />
            <p className="font-bold text-xl">{studentRecapData[selectedStudent.id].promedioGeneral}</p>
            <p className="text-sm">Promedio</p>
          </div>
        </div>
      ),
      icon: Star,
    },
    {
      title: 'Desempeño académico',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-purple-700">Mejor rendimiento</h4>
            <p className="flex justify-between">
              <span>{studentRecapData[selectedStudent.id].mejorRamo.nombre}</span>
              <span className="font-bold">{studentRecapData[selectedStudent.id].mejorRamo.nota}</span>
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-purple-700">Área a mejorar</h4>
            <p className="flex justify-between">
              <span>{studentRecapData[selectedStudent.id].peorRamo.nombre}</span>
              <span className="font-bold">{studentRecapData[selectedStudent.id].peorRamo.nota}</span>
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm italic">"{studentRecapData[selectedStudent.id].mensajeProfesores}"</p>
          </div>
        </div>
      ),
      icon: BookOpen,
    },
    {
      title: 'Participación y logros',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-purple-700">Liderazgo</h4>
            <p>Lideró {studentRecapData[selectedStudent.id].proyectosLiderados} proyectos</p>
            <p>Ayudó a {studentRecapData[selectedStudent.id].compañerosAyudados} compañeros</p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-purple-700">Premios obtenidos</h4>
            <ul className="list-disc pl-5 mt-2">
              {studentRecapData[selectedStudent.id].premiosDetalle.map((premio, index) => (
                <li key={index} className="flex items-start">
                  <Trophy className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  {premio}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h4 className="font-bold flex items-center">
              <Star className="text-yellow-600 mr-2" size={18} />
              Logro destacado
            </h4>
            <p>{studentRecapData[selectedStudent.id].logroDestacado}</p>
          </div>
        </div>
      ),
      icon: Trophy,
    },
    {
      title: 'Desarrollo personal',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-purple-700">Fortaleza principal</h4>
            <p className="flex items-center">
              <Heart className="text-red-400 mr-2" size={18} />
              {studentRecapData[selectedStudent.id].fortalezaPrincipal}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-purple-700">Meta cumplida</h4>
            <p className="flex items-center">
              <Bookmark className="text-green-500 mr-2" size={18} />
              {studentRecapData[selectedStudent.id].metaCumplida}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-purple-700">Amistades</h4>
            <p className="flex items-center">
              <Smile className="text-blue-400 mr-2" size={18} />
              Mejor amigo/a: {studentRecapData[selectedStudent.id].mejorAmigo}
            </p>
            <p className="text-sm mt-1">Participaron juntos en {studentRecapData[selectedStudent.id].actividadesConAmigo} actividades</p>
          </div>
        </div>
      ),
      icon: User,
    },
    {
      title: 'Recuerdo especial del año',
      content: (
        <div className="text-center">
          <h4 className="font-bold text-lg text-purple-700 mb-2">
            {studentRecapData[selectedStudent.id].eventoFavorito}
          </h4>
          <img 
            src={studentRecapData[selectedStudent.id].fotoEvento} 
            alt="Evento especial" 
            className="mx-auto rounded-lg shadow-md mb-3 max-h-52 object-cover"
          />
          <p className="italic text-gray-600">
            "Un momento inolvidable donde demostró todo su potencial"
          </p>
        </div>
      ),
      icon: Smile,
    },
    {
      title: '¡Felicidades!',
      content: (
        <div className="text-center py-4">
          <Award className="mx-auto text-yellow-500 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-purple-800 mb-3">
            ¡Gran año {selectedStudent.name}!
          </h3>
          <p className="text-lg mb-4">
            Has crecido mucho académica y personalmente.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg">
            <p className="font-bold">¡Te esperamos en 2026 para nuevos desafíos y logros!</p>
          </div>
        </div>
      ),
      icon: Award,
    }
  ] : [];

  const currentSlide = recapSlides[slideIndex] || {};
  const SlideIcon = currentSlide.icon;

  // Función para descargar el recap como PDF
  const handleDownloadPDF = async () => {
    if (!recapRef.current) return;
    const element = recapRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Ajusta la imagen al ancho de la página
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`recap-${selectedStudent.name}.pdf`);
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">
          {isApoderado ? 'Mis pupilos' : 'Gestión de Estudiantes'}
        </h1>
        <p className="text-section">
          {isApoderado ? 'Información de tus pupilos/pupilas' : 'Administra los estudiantes del sistema'}
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
                  <p className="text-sm text-gray-600">RUT: {student.rut} | Curso: {student.grade}</p>
                </div>
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition flex items-center"
                  onClick={() => openRecap(student)}
                >
                  <Star size={16} className="mr-1" />
                  Ver recap
                </button>
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

      {/* Recap Modal */}
      {recapOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeRecap}
              aria-label="Cerrar"
            >
              ×
            </button>
            {/* Botón para descargar PDF */}
            <button
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-semibold shadow"
              onClick={handleDownloadPDF}
            >
              <Download size={18} /> Descargar PDF
            </button>
            <div ref={recapRef} className="flex flex-col items-center mb-6 recap-pdf-compatible">
              <style>{`
                .recap-pdf-compatible * {
                  background: #fff !important;
                  color: #3b0764 !important;
                  /* Puedes ajustar más reglas aquí si lo necesitas */
                }
                .recap-pdf-compatible .bg-gradient-to-br,
                .recap-pdf-compatible .bg-purple-50,
                .recap-pdf-compatible .bg-yellow-50,
                .recap-pdf-compatible .bg-green-50,
                .recap-pdf-compatible .bg-blue-50 {
                  background: #f3f4f6 !important;
                }
              `}</style>
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
                {selectedStudent.avatar ? (
                  <img 
                    src={selectedStudent.avatar} 
                    alt={selectedStudent.name} 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <User className="text-purple-600" size={32} />
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-purple-700 text-center">
                Resumen Anual de {selectedStudent.name}
              </h2>
              <p className="text-gray-600">Curso: {selectedStudent.grade}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 shadow-inner">
              {SlideIcon && <SlideIcon className="text-purple-300 mx-auto mb-4" size={48} />}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {currentSlide.title}
                </h3>
              </div>
              
              <div className="mb-6">
                {currentSlide.content}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                className="flex items-center px-4 py-2 bg-purple-100 rounded hover:bg-purple-200 font-semibold text-purple-700 shadow"
                onClick={prevSlide}
              >
                <ChevronLeft size={20} className="mr-1" />
                Anterior
              </button>
              
              <div className="flex space-x-1">
                {recapSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === slideIndex ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setSlideIndex(index)}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                  />
                ))}
              </div>
              
              <span className="text-sm text-purple-500 font-bold">
                {slideIndex + 1} / {recapSlides.length}
              </span>
              
              <button
                className="flex items-center px-4 py-2 bg-purple-100 rounded hover:bg-purple-200 font-semibold text-purple-700 shadow"
                onClick={nextSlide}
              >
                Siguiente
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                onClick={closeRecap}
              >
                Finalizar recorrido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;