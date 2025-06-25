import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { messages } from '../../data/mockData';
import { MessageSquare, Send, Reply } from 'lucide-react';

const MessageManagement = () => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getUserMessages = () => {
    return messages.filter(m => m.fromId === user.id || m.toId === user.id);
  };

  const userMessages = getUserMessages();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="heading-section">Mensajería</h1>
        <p className="text-section">Comunicación entre familias y docentes</p>
      </div>

      <div className="content-body">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="feature-card">
              <h3 className="feature-card-title mb-4">Mensajes</h3>
              <div className="space-y-2">
                {userMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedMessage?.id === message.id
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                      } ${!message.read && message.toId === user.id ? 'border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {message.fromId === user.id ? `Para: ${message.toName}` : `De: ${message.fromName}`}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {message.subject}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(message.date)}
                        </div>
                      </div>
                      {!message.read && message.toId === user.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {userMessages.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No hay mensajes
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="feature-card">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>De: {selectedMessage.fromName}</span>
                    <span className="mx-2">•</span>
                    <span>Para: {selectedMessage.toName}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(selectedMessage.date)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <button className="btn-primary btn-icon">
                    <Reply size={16} />
                    Responder
                  </button>
                </div>
              </div>
            ) : (
              <div className="feature-card">
                <div className="text-center py-12">
                  <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona un mensaje para ver su contenido</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Message Button */}
        <div className="mt-6">
          <button className="btn-primary btn-icon">
            <Send size={16} />
            Nuevo Mensaje
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageManagement;
