package com.prueba.backendcajacomentarios.model;

import java.util.List;

public class Usuario {
    private String nombre;
    private String foto;
    private String comentario;
    private List<Usuario> replicas;

    // Constructor vacío (por defecto)
    public Usuario() {
    }

    // Constructor con parámetros
    public Usuario(String nombre, String foto, String comentario, List<Usuario> replicas) {
        this.nombre = nombre;
        this.foto = foto;
        this.comentario = comentario;
        this.replicas = replicas;
    }

    // Getter para el atributo nombre
    public String getNombre() {
        return nombre;
    }

    // Setter para el atributo nombre
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter para el atributo foto
    public String getFoto() {
        return foto;
    }

    // Setter para el atributo foto
    public void setFoto(String foto) {
        this.foto = foto;
    }

    // Setter para el atributo comentario
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    // Getter para el atributo comentario
    public String getComentario() {
        return comentario;
    }

    // Getter para el atributo replicas
    public List<Usuario> getReplicas() {
        return replicas;
    }

    // Setter para el atributo replicas
    public void setReplicas(List<Usuario> replicas) {
        this.replicas = replicas;
    }
}

