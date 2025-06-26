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
      // Estadísticas académicas
      actividadesTotales: 156,
      evaluacionesRendidas: 28,
      tareasEntregadas: 45,
      proyectosRealizados: 12,
      asistencia: 96.8,
      faltas: 4,
      atrasos: 2,
      promedioGeneral: 6.4,

      // Rendimiento por asignatura
      mejorRamo: { nombre: "Matemáticas", nota: 6.8, progreso: "+0.6" },
      segundoMejor: { nombre: "Ciencias Naturales", nota: 6.7, progreso: "+0.4" },
      areaDesafio: { nombre: "Historia", nota: 5.9, progreso: "+0.2" },

      // Participación y liderazgo
      proyectosLiderados: 3,
      presentacionesOrales: 8,
      trabajosGrupales: 15,
      compañerosAyudados: 12,

      // Reconocimientos específicos
      premiosDetalle: [
        "🏆 Mejor desempeño en Olimpiadas de Matemáticas",
        "🌟 Estudiante destacado del mes (Abril)",
        "🤝 Premio al compañerismo y trabajo en equipo",
        "📚 Excelencia en proyecto de Ciencias Naturales"
      ],

      // Desarrollo personal y social
      mejorAmigo: "Camila Torres",
      actividadesConAmigo: 23,
      clubesParticipacion: ["Club de Ciencias", "Taller de Robótica"],
      deportesPracticados: ["Fútbol", "Atletismo"],

      // Mensajes personalizados
      mensajeProfesores: "Sofía ha mostrado un crecimiento excepcional este año. Su dedicación en matemáticas es admirable y su capacidad para ayudar a sus compañeros demuestra gran madurez. Ha desarrollado excelentes habilidades de liderazgo en los proyectos grupales.",
      mensajeDirector: "Es un orgullo tener a Sofía en nuestra escuela. Su compromiso académico y valores humanos la convierten en un ejemplo para sus pares.",

      // Logros específicos del año
      logroDestacado: "Representó a la escuela en las Olimpiadas Regionales de Matemáticas, obteniendo el 2° lugar",
      proyectoEstrella: "Creación de un sistema de riego automatizado para el huerto escolar",

      // Fortalezas y crecimiento
      fortalezaPrincipal: "Pensamiento lógico-matemático y capacidad de resolución de problemas complejos",
      habilidadDesarrollada: "Liderazgo y comunicación efectiva en presentaciones",
      metaCumplida: "Subir su promedio general de 5.8 a 6.4 (¡Meta superada!)",

      // Eventos memorables
      eventoFavorito: "Feria Científica Escolar 2025",
      momentoEspecial: "Cuando su proyecto de robótica ganó el primer lugar y fue seleccionado para la feria regional",

      // Planes futuros
      metaProximoAño: "Mantener promedio sobre 6.5 y participar en más competencias académicas",
      asignaturaInteres: "Física (nueva asignatura en 6° básico)",

      // Datos familiares y contexto
      apoyoFamiliar: "Excelente apoyo de sus padres en todas las actividades escolares",
      participacionApoderados: "Sus padres asistieron al 100% de las reuniones y actividades"
    },
    2: {
      // Datos para Diego (segundo estudiante)
      actividadesTotales: 142,
      evaluacionesRendidas: 26,
      tareasEntregadas: 41,
      proyectosRealizados: 10,
      asistencia: 94.2,
      faltas: 7,
      atrasos: 3,
      promedioGeneral: 6.1,

      mejorRamo: { nombre: "Artes Visuales", nota: 6.9, progreso: "+0.8" },
      segundoMejor: { nombre: "Educación Física", nota: 6.6, progreso: "+0.3" },
      areaDesafio: { nombre: "Matemáticas", nota: 5.7, progreso: "+0.3" },

      proyectosLiderados: 2,
      presentacionesOrales: 6,
      trabajosGrupales: 12,
      compañerosAyudados: 8,

      premiosDetalle: [
        "🎨 Primer lugar en concurso de pintura escolar",
        "⚽ Mejor jugador del equipo de fútbol",
        "🎭 Participación destacada en obra teatral",
        "🌱 Compromiso ambiental - Proyecto de reciclaje"
      ],

      mejorAmigo: "Sofía Pérez García",
      actividadesConAmigo: 23,
      clubesParticipacion: ["Taller de Arte", "Equipo de Fútbol"],
      deportesPracticados: ["Fútbol", "Básquetbol"],

      mensajeProfesores: "Diego ha demostrado una creatividad excepcional en todas las actividades artísticas. Su talento natural para las artes visuales es notable, y ha mejorado considerablemente en las áreas académicas más desafiantes.",
      mensajeDirector: "Diego aporta alegría y creatividad a nuestra comunidad escolar. Su espíritu deportivo y artístico enriquece la experiencia de todos.",

      logroDestacado: "Su mural sobre la biodiversidad chilena fue seleccionado para decorar permanentemente el hall principal",
      proyectoEstrella: "Diseño y creación de los escenarios para la obra teatral del Día del Estudiante",

      fortalezaPrincipal: "Creatividad artística y habilidades deportivas excepcionales",
      habilidadDesarrollada: "Trabajo en equipo y expresión artística",
      metaCumplida: "Mejorar en matemáticas y mantener excelencia en artes (¡Logrado!)",

      eventoFavorito: "Festival de Talentos Escolares 2025",
      momentoEspecial: "Cuando dirigió la presentación artística que representó a la escuela en el festival comunal",

      metaProximoAño: "Seguir desarrollando sus talentos artísticos y mejorar en ciencias",
      asignaturaInteres: "Música (quiere aprender a tocar guitarra)",

      apoyoFamiliar: "Gran apoyo familiar en actividades deportivas y artísticas",
      participacionApoderados: "Participación activa en eventos escolares y deportivos"
    }
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
      title: `¡El año académico 2025 de ${selectedStudent.name}!`,
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl text-center border border-blue-200">
              <BookOpen className="mx-auto text-blue-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-2xl text-blue-800">{studentRecapData[selectedStudent.id]?.actividadesTotales}</p>
              <p className="text-xs sm:text-sm text-blue-600 font-medium">Actividades Realizadas</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-xl text-center border border-green-200">
              <Calendar className="mx-auto text-green-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-2xl text-green-800">{studentRecapData[selectedStudent.id]?.asistencia}%</p>
              <p className="text-xs sm:text-sm text-green-600 font-medium">Asistencia</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl text-center border border-purple-200">
              <Award className="mx-auto text-purple-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-2xl text-purple-800">{studentRecapData[selectedStudent.id]?.promedioGeneral}</p>
              <p className="text-xs sm:text-sm text-purple-600 font-medium">Promedio General</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 rounded-xl text-center border border-orange-200">
              <Users className="mx-auto text-orange-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-2xl text-orange-800">{studentRecapData[selectedStudent.id]?.proyectosRealizados}</p>
              <p className="text-xs sm:text-sm text-orange-600 font-medium">Proyectos</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-indigo-200">
            <p className="text-center text-indigo-700 font-medium text-sm sm:text-base">
              <span className="font-bold">{studentRecapData[selectedStudent.id]?.evaluacionesRendidas}</span> evaluaciones •
              <span className="font-bold"> {studentRecapData[selectedStudent.id]?.tareasEntregadas}</span> tareas •
              <span className="font-bold"> {studentRecapData[selectedStudent.id]?.presentacionesOrales}</span> presentaciones
            </p>
          </div>
        </div>
      ),
      icon: Star,
    },
    {
      title: 'Rendimiento Académico por Asignatura',
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-lg text-green-800 flex items-center">
                  <Trophy className="mr-2 text-green-600" size={20} />
                  Mejor Rendimiento
                </h4>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                  {studentRecapData[selectedStudent.id]?.mejorRamo.progreso}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-medium">{studentRecapData[selectedStudent.id]?.mejorRamo.nombre}</span>
                <span className="font-bold text-2xl text-green-800">{studentRecapData[selectedStudent.id]?.mejorRamo.nota}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-lg text-blue-800 flex items-center">
                  <Star className="mr-2 text-blue-600" size={20} />
                  Segundo Mejor
                </h4>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {studentRecapData[selectedStudent.id]?.segundoMejor.progreso}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700 font-medium">{studentRecapData[selectedStudent.id]?.segundoMejor.nombre}</span>
                <span className="font-bold text-2xl text-blue-800">{studentRecapData[selectedStudent.id]?.segundoMejor.nota}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-lg text-amber-800 flex items-center">
                  <Bookmark className="mr-2 text-amber-600" size={20} />
                  Área de Crecimiento
                </h4>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-medium">
                  {studentRecapData[selectedStudent.id]?.areaDesafio.progreso}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">{studentRecapData[selectedStudent.id]?.areaDesafio.nombre}</span>
                <span className="font-bold text-2xl text-amber-800">{studentRecapData[selectedStudent.id]?.areaDesafio.nota}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2 flex items-center">
              <Heart className="mr-2 text-purple-600" size={18} />
              Mensaje de tus Profesores
            </h4>
            <p className="text-sm italic text-purple-700 leading-relaxed">
              "{studentRecapData[selectedStudent.id]?.mensajeProfesores}"
            </p>
          </div>
        </div>
      ),
      icon: BookOpen,
    },
    {
      title: 'Participación y Reconocimientos',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-3 sm:p-4 rounded-xl text-center border border-indigo-200">
              <Users className="mx-auto text-indigo-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-xl text-indigo-800">{studentRecapData[selectedStudent.id]?.proyectosLiderados}</p>
              <p className="text-xs sm:text-sm text-indigo-600 font-medium">Proyectos Liderados</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-3 sm:p-4 rounded-xl text-center border border-emerald-200">
              <Heart className="mx-auto text-emerald-600 mb-1 sm:mb-2" size={20} />
              <p className="font-bold text-lg sm:text-xl text-emerald-800">{studentRecapData[selectedStudent.id]?.compañerosAyudados}</p>
              <p className="text-xs sm:text-sm text-emerald-600 font-medium">Compañeros Ayudados</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-amber-800 mb-3 flex items-center">
              <Trophy className="mr-2 text-amber-600" size={20} />
              Reconocimientos del Año
            </h4>
            <div className="space-y-2">
              {studentRecapData[selectedStudent.id]?.premiosDetalle.map((premio, index) => (
                <div key={index} className="flex items-start bg-white p-2 rounded-lg shadow-sm">
                  <span className="text-lg mr-2">{premio.split(' ')[0]}</span>
                  <span className="text-sm text-amber-700 font-medium">{premio.substring(premio.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2 flex items-center">
              <Star className="mr-2 text-purple-600" size={18} />
              Logro Más Destacado del Año
            </h4>
            <p className="text-purple-700 font-medium leading-relaxed">{studentRecapData[selectedStudent.id]?.logroDestacado}</p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
            <h4 className="font-bold text-cyan-800 mb-2 flex items-center">
              <Bookmark className="mr-2 text-cyan-600" size={18} />
              Proyecto Estrella
            </h4>
            <p className="text-cyan-700 font-medium">{studentRecapData[selectedStudent.id]?.proyectoEstrella}</p>
          </div>
        </div>
      ),
      icon: Trophy,
    },
    {
      title: 'Desarrollo Personal y Social',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
            <h4 className="font-bold text-rose-800 mb-3 flex items-center">
              <Heart className="mr-2 text-rose-600" size={20} />
              Tu Fortaleza Principal
            </h4>
            <p className="text-rose-700 font-medium leading-relaxed">
              {studentRecapData[selectedStudent.id]?.fortalezaPrincipal}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
              <Trophy className="mr-2 text-emerald-600" size={20} />
              Habilidad Desarrollada Este Año
            </h4>
            <p className="text-emerald-700 font-medium">
              {studentRecapData[selectedStudent.id]?.habilidadDesarrollada}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <Bookmark className="mr-2 text-blue-600" size={20} />
              Meta Personal Cumplida
            </h4>
            <p className="text-blue-700 font-medium">
              {studentRecapData[selectedStudent.id]?.metaCumplida}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <Smile className="mr-2 text-amber-600" size={18} />
                Mejor Compañero de Aventuras
              </h4>
              <p className="text-amber-700 font-medium">{studentRecapData[selectedStudent.id]?.mejorAmigo}</p>
              <p className="text-sm text-amber-600 mt-1">
                Compartieron {studentRecapData[selectedStudent.id]?.actividadesConAmigo} actividades juntos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-xl text-center border border-purple-200">
              <p className="text-xs text-purple-600 font-medium mb-1">Clubes</p>
              <p className="text-xs sm:text-sm text-purple-800 font-bold">
                {studentRecapData[selectedStudent.id]?.clubesParticipacion?.join(', ')}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl text-center border border-orange-200">
              <p className="text-xs text-orange-600 font-medium mb-1">Deportes</p>
              <p className="text-xs sm:text-sm text-orange-800 font-bold">
                {studentRecapData[selectedStudent.id]?.deportesPracticados?.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ),
      icon: User,
    },
    {
      title: 'Momento Especial del Año',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-4">
              <h4 className="font-bold text-xl text-indigo-800 mb-4 flex items-center justify-center">
                <Star className="mr-2 text-indigo-600" size={24} />
                {studentRecapData[selectedStudent.id]?.eventoFavorito}
              </h4>

              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="mx-auto text-blue-500 mb-2" size={32} />
                    <p className="text-blue-700 font-medium">Evento Memorable</p>
                  </div>
                </div>
              </div>

              <p className="text-indigo-700 font-medium italic leading-relaxed">
                "{studentRecapData[selectedStudent.id]?.momentoEspecial}"
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-200">
            <h4 className="font-bold text-teal-800 mb-2 flex items-center">
              <Heart className="mr-2 text-teal-600" size={18} />
              Mensaje del Director
            </h4>
            <p className="text-teal-700 italic leading-relaxed">
              "{studentRecapData[selectedStudent.id]?.mensajeDirector}"
            </p>
          </div>
        </div>
      ),
      icon: Smile,
    },
    {
      title: 'Mirando hacia el Futuro',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200 text-center">
            <Bookmark className="mx-auto text-violet-600 mb-4" size={32} />
            <h4 className="font-bold text-xl text-violet-800 mb-3">Meta para el Próximo Año</h4>
            <p className="text-violet-700 font-medium text-lg">
              {studentRecapData[selectedStudent.id]?.metaProximoAño}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center">
                <BookOpen className="mr-2 text-emerald-600" size={18} />
                Nueva Asignatura de Interés
              </h4>
              <p className="text-emerald-700 font-medium">
                {studentRecapData[selectedStudent.id]?.asignaturaInteres}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <Users className="mr-2 text-blue-600" size={18} />
              Apoyo Familiar
            </h4>
            <div className="space-y-2">
              <p className="text-blue-700 text-sm">
                <span className="font-medium">Compromiso:</span> {studentRecapData[selectedStudent.id]?.apoyoFamiliar}
              </p>
              <p className="text-blue-700 text-sm">
                <span className="font-medium">Participación:</span> {studentRecapData[selectedStudent.id]?.participacionApoderados}
              </p>
            </div>
          </div>
        </div>
      ),
      icon: Bookmark,
    },
    {
      title: '¡Felicitaciones por tu Excelente Año!',
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-xl opacity-50"></div>
            <Award className="relative mx-auto text-yellow-500 mb-4" size={64} />
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ¡Excelente año, {selectedStudent.name}!
            </h3>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
              <p className="text-lg text-purple-700 font-medium leading-relaxed mb-4">
                Has demostrado un crecimiento excepcional tanto académica como personalmente.
                Tu dedicación, esfuerzo y valores humanos te convierten en un ejemplo para toda nuestra comunidad educativa.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                <div className="text-center">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <Trophy className="mx-auto text-green-600 mb-1" size={16} />
                    <p className="text-xs text-green-800 font-bold">Académico</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <Heart className="mx-auto text-blue-600 mb-1" size={16} />
                    <p className="text-xs text-blue-800 font-bold">Personal</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                    <Users className="mx-auto text-purple-600 mb-1" size={16} />
                    <p className="text-xs text-purple-800 font-bold">Social</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <Star className="mx-auto mb-3" size={32} />
              <p className="font-bold text-xl mb-2">¡Nos vemos en 2026!</p>
              <p className="text-emerald-100">
                Te esperamos para nuevos desafíos, aprendizajes y logros increíbles.
                ¡El futuro está lleno de oportunidades para ti!
              </p>
            </div>
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
    if (!selectedStudent || !recapSlides.length) return;

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Crear un elemento temporal para cada diapositiva
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '800px';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '40px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(tempContainer);

      for (let i = 0; i < recapSlides.length; i++) {
        const slide = recapSlides[i];

        // Crear el contenido HTML de la diapositiva
        tempContainer.innerHTML = `
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: #f3e8ff; border-radius: 50%; margin: 0 auto 20px;">
              <div style="width: 40px; height: 40px; background: #8b5cf6; border-radius: 50%;"></div>
            </div>
            <h1 style="font-size: 28px; font-weight: bold; color: #6b21a8; margin-bottom: 10px;">
              Resumen Anual de ${selectedStudent.name}
            </h1>
            <p style="color: #6b7280; font-size: 16px;">Curso: ${selectedStudent.grade}</p>
          </div>

          <div style="background: linear-gradient(135deg, #faf5ff 0%, #e0e7ff 100%); border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="font-size: 24px; font-weight: bold; color: #6b21a8; margin-bottom: 20px;">
                ${slide.title}
              </h2>
            </div>
            <div id="slide-content-${i}">
              <!-- El contenido se insertará aquí -->
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #8b5cf6; font-size: 14px;">
            Página ${i + 1} de ${recapSlides.length}
          </div>
        `;

        // Insertar el contenido específico de la diapositiva
        const contentContainer = tempContainer.querySelector(`#slide-content-${i}`);
        if (contentContainer) {
          // Crear una versión simplificada del contenido para PDF
          const simplifiedContent = createSimplifiedContent(slide, selectedStudent);
          contentContainer.innerHTML = simplifiedContent;
        }

        // Capturar la diapositiva
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 80;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Agregar nueva página si no es la primera
        if (i > 0) {
          pdf.addPage();
        }

        // Centrar la imagen en la página
        const x = (pageWidth - imgWidth) / 2;
        const y = 40;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      }

      // Limpiar el elemento temporal
      document.body.removeChild(tempContainer);

      // Guardar el PDF
      pdf.save(`recap-${selectedStudent.name.replace(/\s+/g, '-')}.pdf`);

    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
    }
  };

  // Función auxiliar para crear iconos SVG para PDF
  const createIconSVG = (iconName, color = '#6b21a8') => {
    const icons = {
      book: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 20.5v-1zM6.5 2A2.5 2.5 0 0 0 4 4.5v13A2.5 2.5 0 0 0 6.5 20H20v-2H6.5a.5.5 0 0 1 0-1H20V4a2 2 0 0 0-2-2H6.5z"/></svg>`,
      calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      award: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="8" r="7"/><path d="m8.21 13.89 4.79 4.79 4.79-4.79"/></svg>`,
      users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3-3m0 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>`,
      trophy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 13 20.24 13 22"/><path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.96 18.75 11 20.24 11 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
      star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
      heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>`
    };
    return icons[iconName] || icons.star;
  };

  // Función auxiliar para crear contenido simplificado para PDF
  const createSimplifiedContent = (slide, student) => {
    const data = studentRecapData[student.id];

    switch (slide.title) {
      case `¡El año académico 2025 de ${student.name}!`:
        return `
          <div style="margin-bottom: 30px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
                <div style="margin-bottom: 10px;">${createIconSVG('book', '#2563eb')}</div>
                <p style="font-weight: bold; font-size: 28px; color: #1e40af; margin: 5px 0;">${data?.actividadesTotales}</p>
                <p style="font-size: 14px; color: #1d4ed8; font-weight: 600;">Actividades Realizadas</p>
              </div>
              <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #10b981;">
                <div style="margin-bottom: 10px;">${createIconSVG('calendar', '#059669')}</div>
                <p style="font-weight: bold; font-size: 28px; color: #047857; margin: 5px 0;">${data?.asistencia}%</p>
                <p style="font-size: 14px; color: #065f46; font-weight: 600;">Asistencia</p>
              </div>
              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #8b5cf6;">
                <div style="margin-bottom: 10px;">${createIconSVG('award', '#7c3aed')}</div>
                <p style="font-weight: bold; font-size: 28px; color: #6b21a8; margin: 5px 0;">${data?.promedioGeneral}</p>
                <p style="font-size: 14px; color: #581c87; font-weight: 600;">Promedio General</p>
              </div>
              <div style="background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #f97316;">
                <div style="margin-bottom: 10px;">${createIconSVG('users', '#ea580c')}</div>
                <p style="font-weight: bold; font-size: 28px; color: #c2410c; margin: 5px 0;">${data?.proyectosRealizados}</p>
                <p style="font-size: 14px; color: #9a3412; font-weight: 600;">Proyectos</p>
              </div>
            </div>
            <div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); padding: 15px; border-radius: 12px; border: 2px solid #6366f1; text-align: center;">
              <p style="color: #4338ca; font-weight: 600; font-size: 16px;">
                <span style="font-weight: bold; color: #312e81;">${data?.evaluacionesRendidas}</span> evaluaciones •
                <span style="font-weight: bold; color: #312e81;">${data?.tareasEntregadas}</span> tareas •
                <span style="font-weight: bold; color: #312e81;">${data?.presentacionesOrales}</span> presentaciones
              </p>
            </div>
          </div>
        `;

      case 'Rendimiento Académico por Asignatura':
        return `
          <div style="margin-bottom: 30px;">
            <div style="margin-bottom: 20px;">
              <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 20px; border-radius: 12px; border: 2px solid #10b981; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <h4 style="font-weight: bold; font-size: 18px; color: #047857; display: flex; align-items: center;">
                    ${createIconSVG('trophy', '#059669')} &nbsp; Mejor Rendimiento
                  </h4>
                  <span style="background: #bbf7d0; color: #047857; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${data?.mejorRamo?.progreso}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #065f46; font-weight: 600;">${data?.mejorRamo?.nombre}</span>
                  <span style="font-weight: bold; font-size: 24px; color: #047857;">${data?.mejorRamo?.nota}</span>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 12px; border: 2px solid #3b82f6; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <h4 style="font-weight: bold; font-size: 18px; color: #1e40af; display: flex; align-items: center;">
                    ${createIconSVG('star', '#2563eb')} &nbsp; Segundo Mejor
                  </h4>
                  <span style="background: #bfdbfe; color: #1e40af; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${data?.segundoMejor?.progreso}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #1e3a8a; font-weight: 600;">${data?.segundoMejor?.nombre}</span>
                  <span style="font-weight: bold; font-size: 24px; color: #1e40af;">${data?.segundoMejor?.nota}</span>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; border: 2px solid #f59e0b; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <h4 style="font-weight: bold; font-size: 18px; color: #92400e; display: flex; align-items: center;">
                    ${createIconSVG('book', '#d97706')} &nbsp; Área de Crecimiento
                  </h4>
                  <span style="background: #fde68a; color: #92400e; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${data?.areaDesafio?.progreso}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #78350f; font-weight: 600;">${data?.areaDesafio?.nombre}</span>
                  <span style="font-weight: bold; font-size: 24px; color: #92400e;">${data?.areaDesafio?.nota}</span>
                </div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 20px; border-radius: 12px; border: 2px solid #8b5cf6;">
              <h4 style="font-weight: bold; color: #6b21a8; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('heart', '#7c3aed')} &nbsp; Mensaje de tus Profesores
              </h4>
              <p style="font-size: 14px; font-style: italic; color: #6b21a8; line-height: 1.6;">
                "${data?.mensajeProfesores}"
              </p>
            </div>
          </div>
        `;

      case 'Participación y Reconocimientos':
        return `
          <div style="margin-bottom: 30px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #6366f1;">
                <div style="margin-bottom: 10px;">${createIconSVG('users', '#4f46e5')}</div>
                <p style="font-weight: bold; font-size: 24px; color: #3730a3; margin: 5px 0;">${data?.proyectosLiderados}</p>
                <p style="font-size: 14px; color: #312e81; font-weight: 600;">Proyectos Liderados</p>
              </div>
              <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #10b981;">
                <div style="margin-bottom: 10px;">${createIconSVG('heart', '#059669')}</div>
                <p style="font-weight: bold; font-size: 24px; color: #047857; margin: 5px 0;">${data?.compañerosAyudados}</p>
                <p style="font-size: 14px; color: #065f46; font-weight: 600;">Compañeros Ayudados</p>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; border: 2px solid #f59e0b; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #92400e; margin-bottom: 15px; display: flex; align-items: center;">
                ${createIconSVG('trophy', '#d97706')} &nbsp; Reconocimientos del Año
              </h4>
              <div style="display: grid; gap: 10px;">
                ${data?.premiosDetalle?.map(premio => {
          const emoji = premio.split(' ')[0];
          const text = premio.substring(premio.indexOf(' ') + 1);
          return `<div style="display: flex; align-items: center; background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <span style="font-size: 20px; margin-right: 10px;">${emoji}</span>
                    <span style="color: #92400e; font-weight: 600; font-size: 14px;">${text}</span>
                  </div>`;
        }).join('')}
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 20px; border-radius: 12px; border: 2px solid #8b5cf6; margin-bottom: 15px;">
              <h4 style="font-weight: bold; color: #6b21a8; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('star', '#7c3aed')} &nbsp; Logro Más Destacado del Año
              </h4>
              <p style="color: #6b21a8; font-weight: 600; line-height: 1.6;">${data?.logroDestacado}</p>
            </div>

            <div style="background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%); padding: 20px; border-radius: 12px; border: 2px solid #06b6d4;">
              <h4 style="font-weight: bold; color: #0e7490; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('book', '#0891b2')} &nbsp; Proyecto Estrella
              </h4>
              <p style="color: #0e7490; font-weight: 600;">${data?.proyectoEstrella}</p>
            </div>
          </div>
        `;

      case 'Desarrollo Personal y Social':
        return `
          <div style="margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 20px; border-radius: 12px; border: 2px solid #ec4899; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #be185d; margin-bottom: 15px; display: flex; align-items: center;">
                ${createIconSVG('heart', '#db2777')} &nbsp; Tu Fortaleza Principal
              </h4>
              <p style="color: #be185d; font-weight: 600; line-height: 1.6;">
                ${data?.fortalezaPrincipal}
              </p>
            </div>

            <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 12px; border: 2px solid #10b981; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #047857; margin-bottom: 15px; display: flex; align-items: center;">
                ${createIconSVG('trophy', '#059669')} &nbsp; Habilidad Desarrollada Este Año
              </h4>
              <p style="color: #047857; font-weight: 600;">
                ${data?.habilidadDesarrollada}
              </p>
            </div>

            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 12px; border: 2px solid #3b82f6; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #1e40af; margin-bottom: 15px; display: flex; align-items: center;">
                ${createIconSVG('book', '#2563eb')} &nbsp; Meta Personal Cumplida
              </h4>
              <p style="color: #1e40af; font-weight: 600;">
                ${data?.metaCumplida}
              </p>
            </div>

            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; border: 2px solid #f59e0b; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #92400e; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('users', '#d97706')} &nbsp; Mejor Compañero de Aventuras
              </h4>
              <p style="color: #92400e; font-weight: 600; margin-bottom: 5px;">${data?.mejorAmigo}</p>
              <p style="font-size: 14px; color: #78350f;">
                Compartieron ${data?.actividadesConAmigo} actividades juntos
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 15px; border-radius: 12px; text-align: center; border: 2px solid #8b5cf6;">
                <p style="font-size: 12px; color: #6b21a8; font-weight: 600; margin-bottom: 5px;">Clubes</p>
                <p style="font-size: 14px; color: #581c87; font-weight: bold;">
                  ${data?.clubesParticipacion?.join(', ')}
                </p>
              </div>
              <div style="background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%); padding: 15px; border-radius: 12px; text-align: center; border: 2px solid #f97316;">
                <p style="font-size: 12px; color: #c2410c; font-weight: 600; margin-bottom: 5px;">Deportes</p>
                <p style="font-size: 14px; color: #9a3412; font-weight: bold;">
                  ${data?.deportesPracticados?.join(', ')}
                </p>
              </div>
            </div>
          </div>
        `;

      case 'Momento Especial del Año':
        return `
          <div style="margin-bottom: 30px;">
            <div style="text-align: center;">
              <div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); padding: 30px; border-radius: 12px; border: 2px solid #6366f1; margin-bottom: 20px;">
                <h4 style="font-weight: bold; font-size: 20px; color: #3730a3; margin-bottom: 20px; display: flex; align-items: center; justify-content: center;">
                  ${createIconSVG('star', '#4f46e5')} &nbsp; ${data?.eventoFavorito}
                </h4>

                <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px;">
                  <div style="width: 100%; height: 120px; background: linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                      ${createIconSVG('calendar', '#6366f1')}
                      <p style="color: #4f46e5; font-weight: 600; margin-top: 10px;">Evento Memorable</p>
                    </div>
                  </div>
                </div>

                <p style="color: #4338ca; font-weight: 600; font-style: italic; line-height: 1.6; font-size: 16px;">
                  "${data?.momentoEspecial}"
                </p>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%); padding: 20px; border-radius: 12px; border: 2px solid #06b6d4;">
              <h4 style="font-weight: bold; color: #0e7490; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('heart', '#0891b2')} &nbsp; Mensaje del Director
              </h4>
              <p style="color: #0e7490; font-style: italic; line-height: 1.6;">
                "${data?.mensajeDirector}"
              </p>
            </div>
          </div>
        `;

      case 'Mirando hacia el Futuro':
        return `
          <div style="margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 30px; border-radius: 12px; border: 2px solid #8b5cf6; text-align: center; margin-bottom: 20px;">
              <div style="margin-bottom: 20px;">${createIconSVG('book', '#7c3aed')}</div>
              <h4 style="font-weight: bold; font-size: 20px; color: #6b21a8; margin-bottom: 15px;">Meta para el Próximo Año</h4>
              <p style="color: #6b21a8; font-weight: 600; font-size: 18px;">
                ${data?.metaProximoAño}
              </p>
            </div>

            <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 12px; border: 2px solid #10b981; margin-bottom: 20px;">
              <h4 style="font-weight: bold; color: #047857; margin-bottom: 10px; display: flex; align-items: center;">
                ${createIconSVG('book', '#059669')} &nbsp; Nueva Asignatura de Interés
              </h4>
              <p style="color: #047857; font-weight: 600;">
                ${data?.asignaturaInteres}
              </p>
            </div>

            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
              <h4 style="font-weight: bold; color: #1e40af; margin-bottom: 15px; display: flex; align-items: center;">
                ${createIconSVG('users', '#2563eb')} &nbsp; Apoyo Familiar
              </h4>
              <div style="display: grid; gap: 10px;">
                <p style="color: #1e40af; font-size: 14px;">
                  <span style="font-weight: 600;">Compromiso:</span> ${data?.apoyoFamiliar}
                </p>
                <p style="color: #1e40af; font-size: 14px;">
                  <span style="font-weight: 600;">Participación:</span> ${data?.participacionApoderados}
                </p>
              </div>
            </div>
          </div>
        `;

      case '¡Felicitaciones por tu Excelente Año!':
        return `
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="position: relative; margin-bottom: 30px;">
              <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 50%; opacity: 0.3; filter: blur(20px);"></div>
              <div style="position: relative; margin: 0 auto; width: 64px; height: 64px;">
                ${createIconSVG('award', '#f59e0b')}
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px;">
                ¡Excelente año, ${student.name}!
              </h3>

              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%); padding: 30px; border-radius: 12px; border: 2px solid #8b5cf6; margin-bottom: 20px;">
                <p style="font-size: 18px; color: #6b21a8; font-weight: 600; line-height: 1.6; margin-bottom: 20px;">
                  Has demostrado un crecimiento excepcional tanto académica como personalmente.
                  Tu dedicación, esfuerzo y valores humanos te convierten en un ejemplo para toda nuestra comunidad educativa.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                  <div style="text-align: center;">
                    <div style="background: #dcfce7; padding: 15px; border-radius: 8px; border: 2px solid #10b981;">
                      ${createIconSVG('trophy', '#059669')}
                      <p style="font-size: 12px; color: #047857; font-weight: bold; margin-top: 5px;">Académico</p>
                    </div>
                  </div>
                  <div style="text-align: center;">
                    <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border: 2px solid #3b82f6;">
                      ${createIconSVG('heart', '#2563eb')}
                      <p style="font-size: 12px; color: #1e40af; font-weight: bold; margin-top: 5px;">Personal</p>
                    </div>
                  </div>
                  <div style="text-align: center;">
                    <div style="background: #f3e8ff; padding: 15px; border-radius: 8px; border: 2px solid #8b5cf6;">
                      ${createIconSVG('users', '#7c3aed')}
                      <p style="font-size: 12px; color: #6b21a8; font-weight: bold; margin-top: 5px;">Social</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                <div style="margin-bottom: 15px;">${createIconSVG('star', '#ffffff')}</div>
                <p style="font-weight: bold; font-size: 22px; margin-bottom: 10px;">¡Nos vemos en 2026!</p>
                <p style="color: #d1fae5; font-size: 16px; line-height: 1.5;">
                  Te esperamos para nuevos desafíos, aprendizajes y logros increíbles.
                  ¡El futuro está lleno de oportunidades para ti!
                </p>
              </div>
            </div>
          </div>
        `;

      default:
        return '<p>Contenido no disponible</p>';
    }
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-3 sm:p-6 relative animate-fade-in max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl bg-gray-100 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center z-[10000]"
              onClick={closeRecap}
              aria-label="Cerrar"
            >
              ×
            </button>
            {/* Botón para descargar PDF */}
            <button
              className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-semibold shadow text-xs sm:text-sm z-[10000]"
              onClick={handleDownloadPDF}
            >
              <Download size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Descargar PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <div ref={recapRef} className="flex flex-col items-center mb-4 sm:mb-6 recap-pdf-compatible mt-8 sm:mt-0">
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
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-2 sm:mb-3">
                {selectedStudent.avatar ? (
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
                  />
                ) : (
                  <User className="text-purple-600" size={24} />
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-purple-700 text-center px-2">
                Resumen Anual de {selectedStudent.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">Curso: {selectedStudent.grade}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 shadow-inner">
              {SlideIcon && <SlideIcon className="text-purple-300 mx-auto mb-3 sm:mb-4" size={36} />}

              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2 px-2 leading-tight">
                  {currentSlide.title}
                </h3>
              </div>

              <div className="mb-4 sm:mb-6">
                {currentSlide.content}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <button
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-purple-100 rounded hover:bg-purple-200 font-semibold text-purple-700 shadow text-sm sm:text-base order-2 sm:order-1"
                onClick={prevSlide}
              >
                <ChevronLeft size={16} className="mr-1 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Anterior</span>
                <span className="sm:hidden">Ant.</span>
              </button>

              <div className="flex items-center gap-3 order-1 sm:order-2">
                <div className="flex space-x-1">
                  {recapSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === slideIndex ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      onClick={() => setSlideIndex(index)}
                      aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                  ))}
                </div>

                <span className="text-xs sm:text-sm text-purple-500 font-bold">
                  {slideIndex + 1} / {recapSlides.length}
                </span>
              </div>

              <button
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-purple-100 rounded hover:bg-purple-200 font-semibold text-purple-700 shadow text-sm sm:text-base order-3"
                onClick={nextSlide}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <span className="sm:hidden">Sig.</span>
                <ChevronRight size={16} className="ml-1 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <button
                className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm sm:text-base w-full sm:w-auto"
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