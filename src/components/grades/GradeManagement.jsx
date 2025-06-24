import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { grades, students } from '../../data/mockData';
import { BookOpen, TrendingUp, TrendingDown } from 'lucide-react';

const GradeManagement = () => {
  const { user, isApoderado } = useAuth();

  const getGradesData = () => {
    if (isApoderado) {
      const myChildren = students.filter(s => user.students?.includes(s.id));
      return myChildren.map(child => ({
        student: child,
        grades: grades.filter(g => g.studentId === child.id)
      }));
    }
    return students.map(student => ({
      student,
      grades: grades.filter(g => g.studentId === student.id)
    }));
  };

  const getGradeColor = (grade, maxGrade = 7.0) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeIcon = (grade, maxGrade = 7.0) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 60) return <TrendingUp size={16} className="text-green-500" />;
    return <TrendingDown size={16} className="text-red-500" />;
  };

  const gradesData = getGradesData();

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">
          {isApoderado ? 'Calificaciones de mis Hijos' : 'Gestión de Calificaciones'}
        </h1>
        <p className="text-section">
          {isApoderado ? 'Revisa las notas de tus hijos' : 'Consulta e ingresa calificaciones'}
        </p>
      </div>

      <div className="content-body">
        {gradesData.map(({ student, grades: studentGrades }) => (
          <div key={student.id} className="feature-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-blue-500" />
              <h3 className="feature-card-title">
                {student.name} {student.lastName}
              </h3>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {student.grade}
              </span>
            </div>

            {studentGrades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Asignatura</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Calificación</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Fecha</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentGrades.map((grade) => (
                      <tr key={grade.id} className="border-b border-gray-100">
                        <td className="py-2 px-3">{grade.subject}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {getGradeIcon(grade.grade, grade.maxGrade)}
                            <span className={`font-semibold ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                              {grade.grade.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-sm">
                              / {grade.maxGrade.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">
                          {new Date(grade.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">
                          {grade.observations || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No hay calificaciones registradas
              </div>
            )}
          </div>
        ))}

        {gradesData.length === 0 && (
          <div className="feature-card text-center py-8">
            <p className="text-gray-500">No hay datos de calificaciones disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeManagement;
