import { useState, useEffect } from 'react';
import { addTask, getTasks } from '../services/taskService';
import { auth } from '../utils/firebaseConfig';
import { signOut } from 'firebase/auth';

const TaskManager = () => {
  // Estado local para almacenar el valor de la nueva tarea
  const [task, setTask] = useState('');
  // Estado local para almacenar la lista de tareas
  const [tasks, setTasks] = useState<string[]>([]);

  // Efecto para obtener las tareas cuando el componente se monta
  useEffect(() => {
    const fetchTasks = async () => {
      if (auth.currentUser) {
        // Si el usuario está autenticado, obtener las tareas desde Firestore
        const userTasks = await getTasks(auth.currentUser.uid);
        setTasks(userTasks.map(t => t.task));
      } else {
        // Si el usuario no está autenticado, obtener las tareas desde localStorage
        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(localTasks);
      }
    };
    fetchTasks();
  }, []);

  // Función para manejar la adición de una nueva tarea
  const handleAddTask = async () => {
    // Verifica si el campo de texto está vacío
    if (task.trim() === '') return;
    // Verifica si la tarea ya existe en la lista
    if (tasks.includes(task)) {
      alert('Task already exists');
      return;
    }

    try {
      if (auth.currentUser) {
        // Si el usuario está autenticado, añadir la tarea a Firestore
        await addTask(auth.currentUser.uid, task);
        const userTasks = await getTasks(auth.currentUser.uid);
        setTasks(userTasks.map(t => t.task));
      } else {
        // Si el usuario no está autenticado, añadir la tarea a localStorage
        const newTasks = [...tasks, task];
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
      }
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

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Botón para cerrar sesión */}
      <button 
        onClick={handleLogout} 
        className="w-full px-3 py-2 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>
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
      {/* Lista de tareas */}
      <ul className="space-y-2">
        {tasks.map((t, index) => (
          <li key={index} className="px-3 py-2 bg-gray-100 rounded-md">{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;