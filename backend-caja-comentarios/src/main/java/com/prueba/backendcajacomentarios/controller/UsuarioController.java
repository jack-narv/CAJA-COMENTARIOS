package com.prueba.backendcajacomentarios.controller;
import com.prueba.backendcajacomentarios.model.Usuario;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    //private final String JSON_FILE_PATH = "../bdJson/usuarios.json";

   // IMPORTANTE: COLOCAR LA RUTA DE SU ARCHIVO usuario.json que se encuentra dentro de la carpeta bdJson
    private final String JSON_FILE_PATH = "C:\\CURSOS\\backend-caja-comentarios\\src\\main\\java\\com\\prueba\\backendcajacomentarios\\bdJson\\usuarios.json";

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Endpoint para obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAll() throws IOException {
        File file = new File(JSON_FILE_PATH);
        System.out.println("UBI ARCHIVO JSON: "+file);
        if (file.exists()) {
            return objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Usuario.class));
        } else {
            return new ArrayList<>();
        }
    }

    // Endpoint para obtener un usuario por su nombre
    @GetMapping("/{nombre}")
    public Usuario getByNombre(@PathVariable String nombre) throws IOException {
        List<Usuario> usuarios = getAll();
        for (Usuario usuario : usuarios) {
            if (usuario.getNombre().equals(nombre)) {
                return usuario;
            }
        }
        return null; // Usuario no encontrado
    }

    // Endpoint para crear un nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario nuevoUsuario) throws IOException {
        List<Usuario> usuarios = getAll();
        usuarios.add(nuevoUsuario);
        objectMapper.writeValue(new File(JSON_FILE_PATH), usuarios);
        return nuevoUsuario;
    }

    // Endpoint para actualizar un usuario existente por su nombre
    @PutMapping("/{nombre}")
    public void actualizarUsuario(@PathVariable String nombre, @RequestBody Usuario usuarioActualizado) throws IOException {
        List<Usuario> usuarios = getAll();
        for (int i = 0; i < usuarios.size(); i++) {
            if (usuarios.get(i).getNombre().equals(nombre)) {
                usuarios.set(i, usuarioActualizado);
                objectMapper.writeValue(new File(JSON_FILE_PATH), usuarios);
                return;
            }
        }
    }

    // Endpoint para eliminar un usuario por su nombre
    @DeleteMapping("/{nombre}")
    public void eliminarUsuario(@PathVariable String nombre) throws IOException {
        List<Usuario> usuarios = getAll();
        usuarios.removeIf(usuario -> usuario.getNombre().equals(nombre));
        objectMapper.writeValue(new File(JSON_FILE_PATH), usuarios);
    }

    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAll() throws IOException {
        File file = new File(JSON_FILE_PATH);
        if (file.exists()) {
            // Crear una lista vacía para sobrescribir el archivo JSON existente
            List<Usuario> listaVacia = new ArrayList<>();
            objectMapper.writeValue(file, listaVacia);

            return ResponseEntity.ok("Todos los registros han sido eliminados.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para crear nuevos usuarios
    @PostMapping("/todos")
    public List<Usuario> crearUsuarios(@RequestBody List<Usuario> nuevosUsuarios) throws IOException {
        List<Usuario> usuarios = getAll();
        usuarios.addAll(nuevosUsuarios); // Agregar los nuevos usuarios a la lista existente

        objectMapper.writeValue(new File(JSON_FILE_PATH), usuarios);
        return usuarios;
    }



}
