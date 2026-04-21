-- ========================================
-- BASE DE DATOS: task_manager
-- Aplicació de Gestió de Tasques
-- ========================================

-- Usar la base de datos
USE task_manager;

-- ========================================
-- TAULA 1: usuaris (Usuarios)
-- ========================================
CREATE TABLE IF NOT EXISTS usuaris (
    id_usuari INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    cognoms VARCHAR(150) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    contrasenya VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'gestor', 'empleat') DEFAULT 'empleat',
    data_creacio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actiu BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TAULA 2: projectes (Proyectos)
-- ========================================
CREATE TABLE IF NOT EXISTS projectes (
    id_projecte INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    descripció TEXT,
    data_inici DATE NOT NULL,
    data_fi DATE,
    id_gestor INT NOT NULL,
    estat ENUM('no_iniciat', 'en_curs', 'pausat', 'finalitzat') DEFAULT 'no_iniciat',
    data_creacio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_gestor) REFERENCES usuaris(id_usuari) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TAULA 3: tipus_tasques (Tipos de Tareas)
-- ========================================
CREATE TABLE IF NOT EXISTS tipus_tasques (
    id_tipus INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    descripció TEXT,
    color VARCHAR(7) DEFAULT '#3498db',
    data_creacio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TAULA 4: tasques (Tareas)
-- ========================================
CREATE TABLE IF NOT EXISTS tasques (
    id_tasca INT AUTO_INCREMENT PRIMARY KEY,
    id_projecte INT NOT NULL,
    id_tipus INT NOT NULL,
    titol VARCHAR(200) NOT NULL,
    descripció TEXT,
    prioritat ENUM('baixa', 'mitjana', 'alta', 'critica') DEFAULT 'mitjana',
    estat ENUM('nova', 'en_progres', 'en_revisio', 'finalitzada', 'cancel·lada') DEFAULT 'nova',
    id_assignat INT,
    hores_estimades DECIMAL(5,2) DEFAULT 0,
    hores_reals DECIMAL(5,2) DEFAULT 0,
    data_creacio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_venciment DATE,
    data_completada DATETIME,
    FOREIGN KEY (id_projecte) REFERENCES projectes(id_projecte) ON DELETE CASCADE,
    FOREIGN KEY (id_tipus) REFERENCES tipus_tasques(id_tipus) ON DELETE RESTRICT,
    FOREIGN KEY (id_assignat) REFERENCES usuaris(id_usuari) ON DELETE SET NULL,
    INDEX idx_projecte (id_projecte),
    INDEX idx_assignat (id_assignat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TAULA 5: registre_hores (Registro de Horas)
-- ========================================
CREATE TABLE IF NOT EXISTS registre_hores (
    id_registre INT AUTO_INCREMENT PRIMARY KEY,
    id_tasca INT NOT NULL,
    id_usuari INT NOT NULL,
    hores_treballades DECIMAL(5,2) NOT NULL,
    descripcio_treball VARCHAR(255),
    data_registre DATE NOT NULL,
    data_creacio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tasca) REFERENCES tasques(id_tasca) ON DELETE CASCADE,
    FOREIGN KEY (id_usuari) REFERENCES usuaris(id_usuari) ON DELETE RESTRICT,
    INDEX idx_tasca (id_tasca),
    INDEX idx_usuari (id_usuari),
    INDEX idx_data (data_registre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- INSERTS: DADES DE PROVA
-- ========================================

-- Usuarios
INSERT INTO usuaris (nom, cognoms, email, contrasenya, rol) VALUES
('Guillem', 'Riera', 'guillem@task.local', SHA2('password123', 256), 'gestor'),
('Anna', 'García', 'anna@task.local', SHA2('password123', 256), 'empleat'),
('Josep', 'Martínez', 'josep@task.local', SHA2('password123', 256), 'empleat'),
('Laura', 'Sánchez', 'laura@task.local', SHA2('password123', 256), 'admin'),
('Marc', 'López', 'marc@task.local', SHA2('password123', 256), 'empleat');

-- Tipos de Tareas
INSERT INTO tipus_tasques (nom, descripció, color) VALUES
('Desarrollo', 'Tareas de desarrollo de código', '#3498db'),
('Testing', 'Tareas de pruebas y QA', '#e74c3c'),
('Documentación', 'Tareas de documentación', '#f39c12'),
('Diseño', 'Tareas de diseño y UX/UI', '#9b59b6'),
('Investigación', 'Tareas de investigación', '#1abc9c'),
('Deployment', 'Tareas de despliegue', '#34495e');

-- Proyectos
INSERT INTO projectes (nom, descripció, data_inici, data_fi, id_gestor, estat) VALUES
('Sistema de Gestión de Tasques', 'Aplicación web para gestionar tareas y proyectos', '2026-01-15', '2026-06-30', 1, 'en_curs'),
('Portal Web DAW2', 'Portal educativo para estudiantes de DAW2', '2026-02-01', '2026-05-31', 1, 'en_curs'),
('API REST Backend', 'Desarrollo de API REST para gestión de tareas', '2026-02-15', '2026-04-30', 1, 'en_curs');

-- Tareas del Proyecto 1
INSERT INTO tasques (id_projecte, id_tipus, titol, descripció, prioritat, estat, id_assignat, hores_estimades, data_venciment) VALUES
(1, 1, 'Crear estructura base del proyecto', 'Configurar carpetas y archivos iniciales', 'alta', 'finalitzada', 2, 8, '2026-01-20'),
(1, 2, 'Pruebas unitarias del módulo login', 'Escribir tests para validar login', 'alta', 'en_progres', 3, 12, '2026-02-28'),
(1, 1, 'Implementar módulo de usuarios', 'CRUD de usuarios con validaciones', 'alta', 'en_progres', 2, 20, '2026-03-15'),
(1, 3, 'Documentar API endpoints', 'Crear documentación de endpoints disponibles', 'mitjana', 'nova', 4, 10, '2026-03-31'),
(1, 4, 'Diseñar mockups de UI', 'Crear prototipos visuales de interfaces', 'mitjana', 'en_progres', 5, 15, '2026-03-10');

-- Tareas del Proyecto 2
INSERT INTO tasques (id_projecte, id_tipus, titol, descripció, prioritat, estat, id_assignat, hores_estimades, data_venciment) VALUES
(2, 4, 'Diseño visual del portal', 'Crear diseño responsive del portal', 'alta', 'en_progres', 5, 25, '2026-02-28'),
(2, 1, 'Programación frontend', 'HTML, CSS y JavaScript del portal', 'alta', 'en_progres', 2, 30, '2026-03-15'),
(2, 2, 'Testing de navegadores', 'Validar en Chrome, Firefox, Safari', 'mitjana', 'nova', 3, 12, '2026-03-20');

-- Tareas del Proyecto 3
INSERT INTO tasques (id_projecte, id_tipus, titol, descripció, prioritat, estat, id_assignat, hores_estimades, data_venciment) VALUES
(3, 5, 'Investigar framework REST', 'Estudiar opciones de frameworks REST', 'mitjana', 'finalitzada', 2, 8, '2026-02-20'),
(3, 1, 'Implementar endpoints CRUD', 'Crear endpoints para CRUD de recursos', 'alta', 'en_progres', 3, 25, '2026-03-30'),
(3, 6, 'Preparar servidor para deploy', 'Configurar servidor de producción', 'critica', 'nova', 4, 10, '2026-04-15');

-- Registros de Horas
INSERT INTO registre_hores (id_tasca, id_usuari, hores_treballades, descripcio_treball, data_registre) VALUES
(1, 2, 8, 'Configuración inicial del proyecto y carpetas', '2026-01-15'),
(2, 3, 5, 'Primeras pruebas unitarias', '2026-02-10'),
(2, 3, 4, 'Más pruebas y correcciones', '2026-02-12'),
(3, 2, 10, 'Implementación del módulo CRUD', '2026-02-20'),
(3, 2, 8, 'Validaciones y manejo de errores', '2026-02-22'),
(5, 5, 12, 'Mockups iniciales de interfaces', '2026-02-15'),
(5, 5, 6, 'Revisiones y cambios solicitados', '2026-02-22'),
(6, 5, 15, 'Diseño visual completo', '2026-02-25'),
(6, 5, 10, 'Iteraciones finales del diseño', '2026-02-28'),
(7, 2, 12, 'Desarrollo de HTML y CSS', '2026-03-01'),
(7, 2, 18, 'JavaScript interactivo', '2026-03-08'),
(9, 2, 8, 'Investigación y selección de framework', '2026-02-18'),
(10, 3, 12, 'Implementación de endpoints básicos', '2026-03-10'),
(10, 3, 10, 'Endpoints avanzados y filtros', '2026-03-15');

-- ========================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ========================================
CREATE INDEX idx_usuaris_email ON usuaris(email);
CREATE INDEX idx_usuaris_rol ON usuaris(rol);
CREATE INDEX idx_projectes_estat ON projectes(estat);
CREATE INDEX idx_projectes_data ON projectes(data_inici, data_fi);
CREATE INDEX idx_tasques_estat ON tasques(estat);
CREATE INDEX idx_tasques_prioritat ON tasques(prioritat);
CREATE INDEX idx_tasques_data ON tasques(data_venciment);

-- ========================================
-- FIN DEL SCRIPT
-- ========================================
