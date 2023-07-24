import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComentariosEsteticos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faThumbsUp } from "@fortawesome/free-solid-svg-icons";



const Usuario = ({ foto, nombre, comentario, onReplyClick, isReply, replicas    }) => {

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState('');
  const nombreUsuario = localStorage.getItem("nombre");
  const fotoUsuario = localStorage.getItem("foto");
  const [liked, setLiked] = useState(false); // Estado para controlar si se dio like
  const [likesCount, setLikesCount] = useState(0); // Estado para contar los likes
  

  //Abrir caja de comentarios de réplica
  const handleReplyClick = () => {
    setShowReplyBox((prevShowReplyBox) => !prevShowReplyBox);
    if (!showReplyBox) {
      setReply('');
    }
  };
  //Cambio de estado al presionar el botón Reply
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };
  //Enviar réplica en caja de comentarios de replica
  const handleEnviarReply = () => {
    const trimmedReply = reply.trim();
    if (comentario && trimmedReply) {
      onReplyClick(comentario, trimmedReply, replicas);
      setShowReplyBox(false);
      setReply('');
    }

       
  };
   // Función para manejar el clic en el icono de "Like"
   const handleLikeClick = () => {
    if (liked) {
      // Si el comentario ya estaba liked, restamos uno al conteo y cambiamos el estado a false
      setLikesCount((prevLikes) => prevLikes - 1);
      setLiked(false);
    } else {
      // Si el comentario no estaba liked, sumamos uno al conteo y cambiamos el estado a true
      setLikesCount((prevLikes) => prevLikes + 1);
      setLiked(true);
    }
  };

    return (
      <div className="comentario-container">
      <img src={foto} alt="Imagen desde URL" className="usuario-foto" />
      <div className="comentario-info">
        <h4 className="usuario-nombre">{nombre}</h4>
        <p className="usuario-comentario">{comentario}</p>
        <div className="iconos-comentario">
          {isReply ? (
            <span onClick={handleReplyClick}>
              <FontAwesomeIcon icon={faReply} /> Reply
            </span>
          ) : (
            <>
              
              {/* Mostrar el ícono de Like con estilo según si está liked o no */}
              <span className={liked ? "liked" : ""} onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faThumbsUp} /> Like
              </span>
              {/* Mostrar el conteo de likes */}
              <span>{likesCount}</span>


              <span onClick={handleReplyClick}>
                <FontAwesomeIcon icon={faReply} /> Reply
              </span>
            </>
          )}
        </div>
        {showReplyBox && (
          <div className="reply-box">
            <div className="usuario-info">
              <img src={fotoUsuario} alt="Imagen desde URL" className="usuario-foto" />
              <h4 className="usuario-nombre">{nombreUsuario}</h4>
            </div>
            <textarea
              placeholder="Escribe una respuesta..."
              value={reply}
              onChange={handleReplyChange}
            />
            <button onClick={handleEnviarReply}>Enviar</button>
          </div>
        )}
      </div>
    </div>
    );
  };

const Replicas = ({ replicas, onReplyClick  }) => {
    //Función recursiva para recorrer y mostrar todas las réplicas de todos los comentarios
    if (!replicas || replicas.length === 0) {
      return null;
    }
  
    return (

      <div className="replicas-container">
      {replicas.map((replica, index) => (
        <div className={index % 2 === 0 ? "replica-azul" : "replica-blanco"} key={replica.nombre}>
          <Usuario
            foto={replica.foto}
            nombre={replica.nombre}
            comentario={replica.comentario}
            isReply={false} // Pasar 'false' para mostrar los botones de like y delete
            onReplyClick={onReplyClick}
          />
          <Replicas replicas={replica.replicas} onReplyClick={onReplyClick} />
        </div>
      ))}
    </div>
        
    );
  };

const Comentarios = () =>{
    const[usuarios, setUsuarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const nombreUsuario = localStorage.getItem("nombre");
    const fotoUsuario = localStorage.getItem("foto");
    const [reply, setReply] = useState(''); 
    const [showReplyBox, setShowReplyBox] = useState(false);
    


    //Enviar nuevo comentario al Servidor
    useEffect(() => {
        axios.get("http://localhost:8080/api/usuarios").then(response => {
            console.log(response.data);
            setUsuarios(response.data);
        })
      }, []);

      const handleEnviarComentario = () => {
    
        // Aquí se realiza la lógica para enviar el nuevo comentario con axios
        const nuevoComentarioData = {
          nombre: nombreUsuario,
          foto: fotoUsuario,
          comentario: nuevoComentario,
          replicas: [], // replicas como un arreglo vacío inicialmente
        };
    
        // Enviar el nuevo comentario al servidor utilizando POST con axios
        axios
          .post("http://localhost:8080/api/usuarios", nuevoComentarioData)
          .then((response) => {
            console.log("Comentario enviado:", response.data);
            // Actualizar el estado de usuarios para reflejar el nuevo comentario
            setUsuarios([...usuarios, response.data]);
            // Reiniciar el estado del nuevo comentario
            setNuevoComentario("");
          })
          .catch((error) => {
            console.error("Error al enviar el comentario:", error);
          });
      };

      const handleEnviarReply = (comentarioPadre, reply, replicas) => {
        const nuevaReplica = {
          nombre: nombreUsuario,
          foto: fotoUsuario,
          comentario: reply,
          replicas: [], // Inicialmente vacío porque es una réplica y no puede tener réplicas
        };
      
        // Función recursiva para buscar y agregar la réplica en el comentario padre correcto
        const agregarReplicaEnComentario = (comentarios) => {
          return comentarios.map((comentario) => {
            if (comentario.comentario === comentarioPadre) {
              // Clonar el comentario para evitar mutar el estado directamente
              const comentarioClon = { ...comentario };
      
              // Agregar la nueva réplica al comentario padre
              comentarioClon.replicas.push(nuevaReplica);
      
              return comentarioClon;
            } else if (comentario.replicas && comentario.replicas.length > 0) {
              // Si el comentario tiene réplicas anidadas, buscar y agregar la réplica en ellas
              const replicasActualizadas = agregarReplicaEnComentario(comentario.replicas);
              return { ...comentario, replicas: replicasActualizadas };
            }
            return comentario;
          });
        };
      
        // Buscar y agregar la réplica en el comentario padre correspondiente
        const usuariosActualizados = agregarReplicaEnComentario(usuarios);
      
        // Actualizar el estado con el comentario padre y todas las réplicas actualizadas
        console.log("USUARIOS ACTUALIZADOS: "+ usuariosActualizados.data);
        setUsuarios(usuariosActualizados);
      
        // Reiniciar el estado y ocultar el cuadro de respuesta
        setShowReplyBox(false);
        setReply('');

        axios
        //Borrar todos los comentarios del archivo JSON
          .delete("http://localhost:8080/api/usuarios/all")
          .then((response) => {
            console.log(response);
            // Enviar todos los comentarios con sus replicas actualizadas
                axios
                //Post que envía al servidor y guarda en el archivo JSON todos los comentarios con sus replicas actualizadas
                .post("http://localhost:8080/api/usuarios/todos", usuariosActualizados)
                .then((response) => {
                  console.log(response);
                
                })
                .catch((error) => {
                  console.error("Error al borrar los datos del JSON:", error);
                });
          })
          .catch((error) => {
            console.error("Error al borrar los datos del JSON:", error);
          });
      
  
      
      };
      
      
      
      


    return (
      

      <div className="App">
      <h2>Comentarios</h2>
      <div className="nuevo-comentario">
        <div className="usuario-info">
          <img src={fotoUsuario} alt="Imagen desde URL" className="usuario-foto" />
          <h4 className="usuario-nombre">{nombreUsuario}</h4>
        </div>
        <textarea
          className="usuario-comentario"
          placeholder="Escribe un nuevo comentario..."
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
        />
        <button onClick={handleEnviarComentario}>Enviar</button>
      </div>
      <div className="comentarios-scroll">
        {/* Contenedor con scroll con todos los comentarios */}
        {usuarios.map((usuario, index) => (
          <div
            key={usuario.nombre}
            className={`${
              index % 2 === 0 ? "comentario-azul" : "comentario-blanco"
            } ${index === 0 ? "comentario-principal" : ""}`}
          >
            <Usuario
              foto={usuario.foto}
              nombre={usuario.nombre}
              comentario={usuario.comentario}
              onReplyClick={handleEnviarReply}
            />
            <Replicas replicas={usuario.replicas} onReplyClick={handleEnviarReply}/>
          </div>
        ))}
      </div>
    </div>
      
    )
}

export default Comentarios;