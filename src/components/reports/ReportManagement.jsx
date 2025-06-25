import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';
import { reportData } from '../../data/mockData';

const ReportManagement = () => {
  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">Reportes y Estadísticas</h1>
        <p className="text-section">Visualiza el rendimiento académico y asistencia</p>
      </div>

      <div className="content-body">
        {/* Report Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="feature-card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-blue-500" />
              <h3 className="feature-card-title">Asistencia por Mes</h3>
            </div>
            <div className="space-y-3">
              {reportData.attendance.byMonth.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.present}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">{item.present}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <div className="flex items-center gap-2 mb-4">
              <PieChart size={20} className="text-purple-500" />
              <h3 className="feature-card-title">Promedio por Asignatura</h3>
            </div>
            <div className="space-y-3">
              {reportData.grades.bySubject.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.average / 7) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">{item.average.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid gap-6">
          <div className="feature-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="feature-card-title">Asistencia por Curso</h3>
              <button className="btn-secondary btn-icon">
                <Download size={16} />
                Exportar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Curso</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Presentes</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Ausentes</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">% Asistencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.attendance.byGrade.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{item.grade}</td>
                      <td className="py-2 px-3 text-green-600">{item.present}%</td>
                      <td className="py-2 px-3 text-red-600">{item.absent}%</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${item.present}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.present}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="feature-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="feature-card-title">Rendimiento Académico por Curso</h3>
              <button className="btn-secondary btn-icon">
                <Download size={16} />
                Exportar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Curso</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Promedio</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.grades.byGrade.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{item.grade}</td>
                      <td className="py-2 px-3">
                        <span className={`font-semibold ${item.average >= 6.0 ? 'text-green-600' :
                          item.average >= 5.0 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                          {item.average.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1">
                          <TrendingUp size={16} className={
                            item.average >= 6.0 ? 'text-green-500' : 'text-yellow-500'
                          } />
                          <span className="text-sm text-gray-600">Estable</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;
