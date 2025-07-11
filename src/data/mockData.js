// Datos hardcodeados para la aplicación EduConecta Rural

// Usuarios del sistema
export const users = [
  {
    id: 1,
    email: 'admin@educonecta.cl',
    password: 'admin123',
    role: 'admin',
    name: 'María González',
    rut: '12.345.678-9',
    phone: '+56912345678',
    active: true
  },
  {
    id: 2,
    email: 'director@escuela1.cl',
    password: 'director123',
    role: 'director',
    name: 'Carlos Rodríguez',
    rut: '11.234.567-8',
    phone: '+56987654321',
    schoolId: 1,
    active: true
  },
  {
    id: 3,
    email: 'docente1@escuela1.cl',
    password: 'docente123',
    role: 'docente',
    name: 'Ana Martínez',
    rut: '13.456.789-0',
    phone: '+56923456789',
    schoolId: 1,
    subjects: ['Matemáticas', 'Ciencias'],
    active: true
  },
  {
    id: 4,
    email: 'apoderado1@gmail.com',
    password: 'apoderado123',
    role: 'apoderado',
    name: 'Pedro Sánchez',
    rut: '14.567.890-1',
    phone: '+56934567890',
    students: [1, 2],
    active: true
  }
];

// Escuelas rurales
export const schools = [
  {
    id: 1,
    name: 'Escuela Rural Los Aromos',
    rbd: '12345-6',
    address: 'Camino Rural Km 15, Los Aromos',
    commune: 'Temuco',
    region: 'La Araucanía',
    phone: '+56452123456',
    email: 'contacto@losaromas.cl',
    director: 'Carlos Rodríguez',
    totalStudents: 45,
    totalTeachers: 8,
    connectivity: 'Limitada',
    active: true
  },
  {
    id: 2,
    name: 'Escuela Rural Valle Verde',
    rbd: '23456-7',
    address: 'Sector Valle Verde s/n',
    commune: 'Villarrica',
    region: 'La Araucanía',
    phone: '+56452234567',
    email: 'contacto@valleverde.cl',
    director: 'Isabel Torres',
    totalStudents: 32,
    totalTeachers: 6,
    connectivity: 'Intermitente',
    active: true
  }
];

// Estudiantes
export const students = [
  {
    id: 1,
    rut: '25.123.456-7',
    name: 'Sofía',
    lastName: 'Pérez García',
    birthDate: '2012-03-15',
    grade: '5° Básico',
    schoolId: 1,
    parentId: 4,
    address: 'Parcela 12, Los Aromos',
    phone: '+56934567890',
    emergencyContact: 'Pedro Sánchez',
    emergencyPhone: '+56934567890',
    medicalInfo: 'Sin alergias conocidas',
    active: true
  },
  {
    id: 2,
    rut: '26.234.567-8',
    name: 'Diego',
    lastName: 'Sánchez López',
    birthDate: '2014-07-22',
    grade: '3° Básico',
    schoolId: 1,
    parentId: 4,
    address: 'Parcela 12, Los Aromos',
    phone: '+56934567890',
    emergencyContact: 'Pedro Sánchez',
    emergencyPhone: '+56934567890',
    medicalInfo: 'Alérgico a los mariscos',
    active: true
  }
];

// Asistencia
export const attendance = [
  {
    id: 1,
    studentId: 1,
    date: '2024-01-15',
    status: 'presente',
    teacherId: 3,
    observations: ''
  },
  {
    id: 2,
    studentId: 2,
    date: '2024-01-15',
    status: 'ausente',
    teacherId: 3,
    observations: 'Enfermo'
  }
];

// Actividades
export const activities = [
  {
    id: 1,
    title: 'Evaluación de Matemáticas',
    description: 'Evaluación sumativa de fracciones y decimales',
    type: 'evaluacion',
    subject: 'Matemáticas',
    grade: '5° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 25, 9, 0), // 25 junio 2025, 9:00 AM
    endDate: new Date(2025, 5, 25, 10, 30), // 25 junio 2025, 10:30 AM
    dueDate: '2025-06-25',
    status: 'activa',
    location: 'Aula 1',
    color: '#ef4444' // rojo para evaluaciones
  },
  {
    id: 2,
    title: 'Tarea de Ciencias',
    description: 'Investigación sobre el ciclo del agua',
    type: 'tarea',
    subject: 'Ciencias Naturales',
    grade: '4° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 24, 14, 0), // 24 junio 2025, 2:00 PM
    endDate: new Date(2025, 5, 28, 23, 59), // 28 junio 2025, 11:59 PM
    dueDate: '2025-06-28',
    status: 'activa',
    location: 'Casa',
    color: '#3b82f6' // azul para tareas
  },
  {
    id: 3,
    title: 'Clase de Lenguaje',
    description: 'Comprensión lectora y análisis de textos',
    type: 'clase',
    subject: 'Lenguaje y Comunicación',
    grade: '6° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 26, 8, 30), // 26 junio 2025, 8:30 AM
    endDate: new Date(2025, 5, 26, 9, 30), // 26 junio 2025, 9:30 AM
    dueDate: '2025-06-26',
    status: 'activa',
    location: 'Aula 2',
    color: '#10b981' // verde para clases
  },
  {
    id: 4,
    title: 'Clase de Matemáticas',
    description: 'Operaciones con números decimales',
    type: 'clase',
    subject: 'Matemáticas',
    grade: '5° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 27, 9, 0), // 27 junio 2025, 9:00 AM
    endDate: new Date(2025, 5, 27, 10, 0), // 27 junio 2025, 10:00 AM
    dueDate: '2025-06-27',
    status: 'activa',
    location: 'Aula 1',
    color: '#10b981'
  },
  {
    id: 5,
    title: 'Evaluación de Historia',
    description: 'Evaluación sobre pueblos originarios de Chile',
    type: 'evaluacion',
    subject: 'Historia',
    grade: '4° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 28, 10, 0), // 28 junio 2025, 10:00 AM
    endDate: new Date(2025, 5, 28, 11, 30), // 28 junio 2025, 11:30 AM
    dueDate: '2025-06-28',
    status: 'activa',
    location: 'Aula 3',
    color: '#ef4444'
  },
  {
    id: 6,
    title: 'Clase de Ciencias',
    description: 'Experimento: Estados de la materia',
    type: 'clase',
    subject: 'Ciencias Naturales',
    grade: '4° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 29, 11, 0), // 29 junio 2025, 11:00 AM
    endDate: new Date(2025, 5, 29, 12, 0), // 29 junio 2025, 12:00 PM
    dueDate: '2025-06-29',
    status: 'activa',
    location: 'Laboratorio',
    color: '#10b981'
  },
  {
    id: 7,
    title: 'Tarea de Matemáticas',
    description: 'Ejercicios de multiplicación y división',
    type: 'tarea',
    subject: 'Matemáticas',
    grade: '5° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 5, 30, 15, 0), // 30 junio 2025, 3:00 PM
    endDate: new Date(2025, 6, 2, 23, 59), // 2 julio 2025, 11:59 PM
    dueDate: '2025-07-02',
    status: 'activa',
    location: 'Casa',
    color: '#3b82f6'
  },
  {
    id: 8,
    title: 'Reunión de Apoderados',
    description: 'Reunión mensual para revisar avances académicos',
    type: 'reunion',
    subject: 'General',
    grade: '5° Básico',
    teacherId: 3,
    schoolId: 1,
    startDate: new Date(2025, 6, 1, 19, 0), // 1 julio 2025, 7:00 PM
    endDate: new Date(2025, 6, 1, 20, 30), // 1 julio 2025, 8:30 PM
    dueDate: '2025-07-01',
    status: 'activa',
    location: 'Aula Magna',
    color: '#8b5cf6' // púrpura para reuniones
  }
];

// Calificaciones
export const grades = [
  {
    id: 1,
    studentId: 1,
    subject: 'Matemáticas',
    activityId: 1,
    grade: 6.5,
    maxGrade: 7.0,
    date: '2024-01-20',
    teacherId: 3,
    observations: 'Buen desempeño'
  },
  {
    id: 2,
    studentId: 2,
    subject: 'Matemáticas',
    activityId: 1,
    grade: 5.8,
    maxGrade: 7.0,
    date: '2024-01-20',
    teacherId: 3,
    observations: 'Necesita refuerzo'
  }
];

// Mensajes
export const messages = [
  {
    id: 1,
    fromId: 4,
    toId: 3,
    fromName: 'Pedro Sánchez',
    toName: 'Ana Martínez',
    subject: 'Consulta sobre tarea de Sofía',
    message: 'Estimada profesora, quisiera consultar sobre la tarea de matemáticas de mi hija Sofía.',
    date: '2024-01-15T10:30:00',
    read: false,
    studentId: 1
  },
  {
    id: 2,
    fromId: 3,
    toId: 4,
    fromName: 'Ana Martínez',
    toName: 'Pedro Sánchez',
    subject: 'Re: Consulta sobre tarea de Sofía',
    message: 'Estimado Sr. Sánchez, la tarea consiste en resolver los ejercicios de la página 45. Si tiene dudas, puede contactarme.',
    date: '2024-01-15T14:20:00',
    read: true,
    studentId: 1,
    replyTo: 1
  }
];

// Reportes de datos
export const reportData = {
  attendance: {
    byMonth: [
      { month: 'Enero', present: 85, absent: 15 },
      { month: 'Febrero', present: 88, absent: 12 },
      { month: 'Marzo', present: 82, absent: 18 }
    ],
    byGrade: [
      { grade: '1° Básico', present: 90, absent: 10 },
      { grade: '2° Básico', present: 85, absent: 15 },
      { grade: '3° Básico', present: 88, absent: 12 },
      { grade: '4° Básico', present: 83, absent: 17 },
      { grade: '5° Básico', present: 87, absent: 13 }
    ]
  },
  grades: {
    bySubject: [
      { subject: 'Matemáticas', average: 5.8 },
      { subject: 'Lenguaje', average: 6.2 },
      { subject: 'Ciencias', average: 6.0 },
      { subject: 'Historia', average: 5.9 }
    ],
    byGrade: [
      { grade: '1° Básico', average: 6.1 },
      { grade: '2° Básico', average: 5.9 },
      { grade: '3° Básico', average: 6.0 },
      { grade: '4° Básico', average: 5.8 },
      { grade: '5° Básico', average: 6.2 }
    ]
  }
};

// Funciones helper para simular API
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const findUser = (email, password) => {
  return users.find(user => user.email === email && user.password === password && user.active);
};

export const getUsersByRole = (role) => {
  return users.filter(user => user.role === role && user.active);
};

export const getStudentsByParent = (parentId) => {
  return students.filter(student => student.parentId === parentId && student.active);
};

export const getStudentsBySchool = (schoolId) => {
  return students.filter(student => student.schoolId === schoolId && student.active);
};

export const getGradesByStudent = (studentId) => {
  return grades.filter(grade => grade.studentId === studentId);
};

export const getMessagesByUser = (userId) => {
  return messages.filter(message => message.fromId === userId || message.toId === userId);
};
