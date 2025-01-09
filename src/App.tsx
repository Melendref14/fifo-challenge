import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import { auth } from './utils/firebaseConfig';

const App = () => {
  // Estado local para manejar si se muestra el formulario de registro
  const [isRegister, setIsRegister] = useState(false);
  // Estado local para manejar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Efecto para suscribirse a los cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // Actualiza el estado de autenticación basado en si hay un usuario autenticado
      setIsAuthenticated(!!user);
    });
    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        {isAuthenticated ? (
          // Si el usuario está autenticado, muestra el componente TaskManager
          <TaskManager />
        ) : (
          // Si el usuario no está autenticado, muestra el formulario de login o registro
          <>
            {isRegister ? <Register /> : <Login />}
            {/* Botón para alternar entre el formulario de login y registro */}
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="w-full px-3 py-2 mt-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
              {isRegister ? 'Go to Login' : 'Go to Register'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;