import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

const Login = () => {
  // Estado local para almacenar el valor del email y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      // Llama a la función signInWithEmailAndPassword para iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
    } catch (error) {
      // Maneja cualquier error que ocurra durante el inicio de sesión
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
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
      {/* Botón para iniciar sesión */}
      <button 
        onClick={handleLogin} 
        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Login;