import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

const Register = () => {
  // Estado local para almacenar el valor del email y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el registro de usuario
  const handleRegister = async () => {
    try {
      // Llama a la función createUserWithEmailAndPassword para registrar un nuevo usuario con Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful');
    } catch (error) {
      // Maneja cualquier error que ocurra durante el registro
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {/* Campo de texto para ingresar el email */}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        className="w-full px-3 py-2 border rounded-md"
      />
      {/* Campo de texto para ingresar la contraseña */}
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="w-full px-3 py-2 border rounded-md"
      />
      {/* Botón para registrar el nuevo usuario */}
      <button 
        onClick={handleRegister} 
        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md"
      >
        Register
      </button>
    </div>
  );
};

export default Register;