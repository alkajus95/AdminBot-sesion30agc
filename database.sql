CREATE DATABASE adminbot_db;
USE adminbot_db;

CREATE TABLE usuarios (
  id VARCHAR(36) PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(30) DEFAULT 'admin'
);

CREATE TABLE estudiantes (
  id VARCHAR(36) PRIMARY KEY,
  codigo_estudiante VARCHAR(30) NOT NULL UNIQUE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  grado VARCHAR(30),
  estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE asistencias (
  id VARCHAR(36) PRIMARY KEY,
  estudiante_id VARCHAR(36) NOT NULL,
  fecha DATE NOT NULL,
  estado VARCHAR(20) NOT NULL,
  observacion VARCHAR(255),
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id)
);