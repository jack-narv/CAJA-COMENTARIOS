import React, { useState, useEffect } from "react";
import "./Login.css"; // Agrega los estilos del login en un archivo Login.css
import {useNavigate} from 'react-router-dom';

const Home = () =>{
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");

    // Almacenar los valores en el Local Storage cuando cambien
  useEffect(() => {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("foto", foto);
  }, [nombre, foto]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se realizan acciones necesarias con los datos del login, como enviarlos a un servidor o almacenarlos en el estado global de la aplicación.
    console.log("Nombre:", nombre);
    console.log("Foto:", foto);
  };

  const handleButtonClick = () => {
    
    navigate('/coment', {replace: true});
    
  };

  // Cargar los valores desde el Local Storage cuando el componente se monte
  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedFoto = localStorage.getItem("foto");
    if (storedNombre) {
      setNombre(storedNombre);
    }
    if (storedFoto) {
      setFoto(storedFoto);
    }
  }, []);

  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-container">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="foto">URL de la Foto:</label>
          <input
            type="text"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
        </div>
        <button onClick={handleButtonClick} type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Home;