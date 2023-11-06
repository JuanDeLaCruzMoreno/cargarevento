import './App.css';
import React, { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [baseRegistros, setBaseRegistros] = useState([]);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const handleIngreso = () => {
    const usuarioRegistrado = baseRegistros.find(
      (u) => u.usuario === usuario && u.clave === clave
    );
  
    if (usuarioRegistrado) {
      setUsuarioAutenticado(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };
  
  const handleRegistro = () => {
    if (usuario && clave) {
      const usuarioExistente = baseRegistros.find((u) => u.usuario === usuario);
      if (usuarioExistente) {
        alert('Este usuario ya existe. Por favor, elige otro nombre de usuario.');
      } else {
        const nuevoUsuario = { usuario, clave };
        setBaseRegistros([...baseRegistros, nuevoUsuario]);
        setUsuario('');
        setClave('');
        setUsuarioRegistrado(true);
        alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
      }
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  // Esta función se encarga de borrar los campos al cambiar de formulario
  const handleModoCambio = () => {
    setUsuario('');
    setClave('');
    setUsuarioRegistrado(!usuarioRegistrado);
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <h1 className="title">PROGRAMA TU EVENTO</h1>
      
      <div className="login-form">
        {usuarioAutenticado ? (
          <h2>Bienvenido, {usuario}</h2>
        ) : (
          <h2>
            {usuarioRegistrado ? 'Acceder a la plataforma' : 'Nuevo Usuario'}
          </h2>
        )}
        {usuarioAutenticado ? (
          'En esta pantalla tienes acceso para registrar cada uno de los eventos que tengas planeados'
        ) : (
          <>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            {usuarioRegistrado ? (
              <button onClick={handleIngreso}>Iniciar Sesión</button>
            ) : (
              <button onClick={handleRegistro}>Registrarme</button>
            )}
          </>
        )}
        <p>
          {usuarioAutenticado ? (
            <button onClick={() => setUsuarioAutenticado(false)}>
              Cerrar Sesión
            </button>
          ) : (
            usuarioRegistrado ? '¿No estás registrado? Hazlo ' : '¿Ya tienes una cuenta? Inicia sesión.'
          )}
          {!usuarioAutenticado && (
            <span
              className="link"
              onClick={handleModoCambio}
            >
              aquí
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
