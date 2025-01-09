import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

// Función para añadir una nueva tarea a Firestore
const addTask = async (userId: string, task: string) => {
  // Obtiene las tareas del usuario
  const tasks = await getTasks(userId);
  // Verifica si la tarea ya existe
  if (tasks.some(t => t.task === task)) {
    throw new Error("Task already exists");
  }
  // Añade la nueva tarea a la colección "tasks" en Firestore
  await addDoc(collection(db, "tasks"), {
    userId,
    task,
    createdAt: new Date()
  });
};

// Función para obtener las tareas de un usuario desde Firestore
const getTasks = async (userId: string) => {
  // Crea una consulta para obtener las tareas del usuario
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  // Ejecuta la consulta y obtiene los documentos
  const querySnapshot = await getDocs(q);
  // Mapea los documentos a un array de datos de tareas
  return querySnapshot.docs.map(doc => doc.data());
};

export { addTask, getTasks };