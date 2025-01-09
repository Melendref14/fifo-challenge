import { useState } from 'react';
import { addTask } from '../services/taskService';
import { auth } from '../utils/firebaseConfig';

const AddTask = () => {
  // Estado local para almacenar el valor de la nueva tarea
  const [task, setTask] = useState('');

  // Función para manejar la adición de una nueva tarea
  const handleAddTask = async () => {
    // Verifica si el campo de texto está vacío
    if (task.trim() === '') return;
    try {
      // Llama a la función addTask para añadir la tarea a Firestore o localStorage
      await addTask(auth.currentUser?.uid || 'guest', task);
      // Limpia el campo de texto después de añadir la tarea
      setTask('');
    } catch (error) {
      // Maneja cualquier error que ocurra durante la adición de la tarea
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      {/* Campo de texto para ingresar la nueva tarea */}
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="New Task" 
        className="w-full px-3 py-2 border rounded-md"
      />
      {/* Botón para añadir la nueva tarea */}
      <button 
        onClick={handleAddTask} 
        disabled={task.trim() === ''} 
        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;