import { useState, useEffect } from 'react';

const AlertRotator = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [alertIndex, setAlertIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  // Array de mensajes que se mostrarán
  const alertMessages = [
    {
      id: 1,
      type: 'info',
      title: 'Información importante',
      message: 'Este es el primer mensaje informativo.'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Advertencia',
      message: 'Este es el segundo mensaje de advertencia.'
    },
    {
      id: 3,
      type: 'success',
      title: '¡Éxito!',
      message: 'Este es el tercer mensaje de éxito.'
    },
    {
      id: 4,
      type: 'error',
      title: 'Error',
      message: 'Este es el cuarto y último mensaje.'
    }
  ];

  // Función para obtener las clases de Tailwind según el tipo de alerta
  const getAlertClasses = (type) => {
    const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300";
    
    switch (type) {
      case 'info':
        return `${baseClasses} bg-blue-50 border-l-4 border-blue-500 text-blue-700`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700`;
      case 'success':
        return `${baseClasses} bg-green-50 border-l-4 border-green-500 text-green-700`;
      case 'error':
        return `${baseClasses} bg-red-50 border-l-4 border-red-500 text-red-700`;
      default:
        return `${baseClasses} bg-gray-50 border-l-4 border-gray-500 text-gray-700`;
    }
  };

  useEffect(() => {
    // Solo ejecutar si no hemos mostrado todos los mensajes
    if (alertIndex < alertMessages.length) {
      const interval = setInterval(() => {
        // Mostrar el alerta actual
        setCurrentAlert(alertMessages[alertIndex]);
        setShowAlert(true);

        // Ocultar después de 6 segundos
        setTimeout(() => {
          setShowAlert(false);
          
          // Esperar 30 segundos antes de pasar al siguiente mensaje
          setTimeout(() => {
            setAlertIndex(prev => prev + 1);
          }, 30000); // 30 segundos entre mensajes
          
        }, 6000); // 6 segundos mostrando el alerta

      }, 180000); // 3 minutos entre ciclos completos

      return () => clearInterval(interval);
    }
  }, [alertIndex]);

  // Si no hay alerta actual o no debe mostrarse, no renderizar nada
  if (!currentAlert || !showAlert) {
    return null;
  }

  return (
    <div className={getAlertClasses(currentAlert.type)}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {currentAlert.type === 'info' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
          {currentAlert.type === 'warning' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {currentAlert.type === 'success' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {currentAlert.type === 'error' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{currentAlert.title}</h3>
          <p className="text-sm mt-1">{currentAlert.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertRotator;