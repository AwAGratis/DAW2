/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.2.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: task_manager
-- ------------------------------------------------------
-- Server version	12.2.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `projectes`
--

DROP TABLE IF EXISTS `projectes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectes` (
  `id_projecte` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `descripció` text DEFAULT NULL,
  `data_inici` date NOT NULL,
  `data_fi` date DEFAULT NULL,
  `id_gestor` int(11) NOT NULL,
  `estat` enum('no_iniciat','en_curs','pausat','finalitzat') DEFAULT 'no_iniciat',
  `data_creacio` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_projecte`),
  KEY `id_gestor` (`id_gestor`),
  KEY `idx_projectes_estat` (`estat`),
  KEY `idx_projectes_data` (`data_inici`,`data_fi`),
  CONSTRAINT `1` FOREIGN KEY (`id_gestor`) REFERENCES `usuaris` (`id_usuari`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectes`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `projectes` WRITE;
/*!40000 ALTER TABLE `projectes` DISABLE KEYS */;
INSERT INTO `projectes` VALUES
(1,'Sistema de Gestión de Tasques','Aplicación web para gestionar tareas y proyectos','2026-01-15','2026-06-30',1,'en_curs','2026-04-20 15:29:54'),
(2,'Portal Web DAW2','Portal educativo para estudiantes de DAW2','2026-02-01','2026-05-31',1,'en_curs','2026-04-20 15:29:54'),
(3,'API REST Backend','Desarrollo de API REST para gestión de tareas','2026-02-15','2026-04-30',1,'en_curs','2026-04-20 15:29:54');
/*!40000 ALTER TABLE `projectes` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `registre_hores`
--

DROP TABLE IF EXISTS `registre_hores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registre_hores` (
  `id_registre` int(11) NOT NULL AUTO_INCREMENT,
  `id_tasca` int(11) NOT NULL,
  `id_usuari` int(11) NOT NULL,
  `hores_treballades` decimal(5,2) NOT NULL,
  `descripcio_treball` varchar(255) DEFAULT NULL,
  `data_registre` date NOT NULL,
  `data_creacio` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_registre`),
  KEY `idx_tasca` (`id_tasca`),
  KEY `idx_usuari` (`id_usuari`),
  KEY `idx_data` (`data_registre`),
  CONSTRAINT `1` FOREIGN KEY (`id_tasca`) REFERENCES `tasques` (`id_tasca`) ON DELETE CASCADE,
  CONSTRAINT `2` FOREIGN KEY (`id_usuari`) REFERENCES `usuaris` (`id_usuari`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registre_hores`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `registre_hores` WRITE;
/*!40000 ALTER TABLE `registre_hores` DISABLE KEYS */;
INSERT INTO `registre_hores` VALUES
(1,1,2,8.00,'Configuración inicial del proyecto y carpetas','2026-01-15','2026-04-20 15:29:54'),
(2,2,3,5.00,'Primeras pruebas unitarias','2026-02-10','2026-04-20 15:29:54'),
(3,2,3,4.00,'Más pruebas y correcciones','2026-02-12','2026-04-20 15:29:54'),
(4,3,2,10.00,'Implementación del módulo CRUD','2026-02-20','2026-04-20 15:29:54'),
(5,3,2,8.00,'Validaciones y manejo de errores','2026-02-22','2026-04-20 15:29:54'),
(6,5,5,12.00,'Mockups iniciales de interfaces','2026-02-15','2026-04-20 15:29:54'),
(7,5,5,6.00,'Revisiones y cambios solicitados','2026-02-22','2026-04-20 15:29:54'),
(8,6,5,15.00,'Diseño visual completo','2026-02-25','2026-04-20 15:29:54'),
(9,6,5,10.00,'Iteraciones finales del diseño','2026-02-28','2026-04-20 15:29:54'),
(10,7,2,12.00,'Desarrollo de HTML y CSS','2026-03-01','2026-04-20 15:29:54'),
(11,7,2,18.00,'JavaScript interactivo','2026-03-08','2026-04-20 15:29:54'),
(12,9,2,8.00,'Investigación y selección de framework','2026-02-18','2026-04-20 15:29:54'),
(13,10,3,12.00,'Implementación de endpoints básicos','2026-03-10','2026-04-20 15:29:54'),
(14,10,3,10.00,'Endpoints avanzados y filtros','2026-03-15','2026-04-20 15:29:54');
/*!40000 ALTER TABLE `registre_hores` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `tasques`
--

DROP TABLE IF EXISTS `tasques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasques` (
  `id_tasca` int(11) NOT NULL AUTO_INCREMENT,
  `id_projecte` int(11) NOT NULL,
  `id_tipus` int(11) NOT NULL,
  `titol` varchar(200) NOT NULL,
  `descripció` text DEFAULT NULL,
  `prioritat` enum('baixa','mitjana','alta','critica') DEFAULT 'mitjana',
  `estat` enum('nova','en_progres','en_revisio','finalitzada','cancel·lada') DEFAULT 'nova',
  `id_assignat` int(11) DEFAULT NULL,
  `hores_estimades` decimal(5,2) DEFAULT 0.00,
  `hores_reals` decimal(5,2) DEFAULT 0.00,
  `data_creacio` timestamp NULL DEFAULT current_timestamp(),
  `data_venciment` date DEFAULT NULL,
  `data_completada` datetime DEFAULT NULL,
  PRIMARY KEY (`id_tasca`),
  KEY `id_tipus` (`id_tipus`),
  KEY `idx_projecte` (`id_projecte`),
  KEY `idx_assignat` (`id_assignat`),
  KEY `idx_tasques_estat` (`estat`),
  KEY `idx_tasques_prioritat` (`prioritat`),
  KEY `idx_tasques_data` (`data_venciment`),
  CONSTRAINT `1` FOREIGN KEY (`id_projecte`) REFERENCES `projectes` (`id_projecte`) ON DELETE CASCADE,
  CONSTRAINT `2` FOREIGN KEY (`id_tipus`) REFERENCES `tipus_tasques` (`id_tipus`),
  CONSTRAINT `3` FOREIGN KEY (`id_assignat`) REFERENCES `usuaris` (`id_usuari`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasques`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `tasques` WRITE;
/*!40000 ALTER TABLE `tasques` DISABLE KEYS */;
INSERT INTO `tasques` VALUES
(1,1,1,'Crear estructura base del proyecto','Configurar carpetas y archivos iniciales','alta','finalitzada',2,8.00,0.00,'2026-04-20 15:29:54','2026-01-20',NULL),
(2,1,2,'Pruebas unitarias del módulo login','Escribir tests para validar login','alta','en_progres',3,12.00,0.00,'2026-04-20 15:29:54','2026-02-28',NULL),
(3,1,1,'Implementar módulo de usuarios','CRUD de usuarios con validaciones','alta','en_progres',2,20.00,0.00,'2026-04-20 15:29:54','2026-03-15',NULL),
(4,1,3,'Documentar API endpoints','Crear documentación de endpoints disponibles','mitjana','nova',4,10.00,0.00,'2026-04-20 15:29:54','2026-03-31',NULL),
(5,1,4,'Diseñar mockups de UI','Crear prototipos visuales de interfaces','mitjana','en_progres',5,15.00,0.00,'2026-04-20 15:29:54','2026-03-10',NULL),
(6,2,4,'Diseño visual del portal','Crear diseño responsive del portal','alta','en_progres',5,25.00,0.00,'2026-04-20 15:29:54','2026-02-28',NULL),
(7,2,1,'Programación frontend','HTML, CSS y JavaScript del portal','alta','en_progres',2,30.00,0.00,'2026-04-20 15:29:54','2026-03-15',NULL),
(8,2,2,'Testing de navegadores','Validar en Chrome, Firefox, Safari','mitjana','nova',3,12.00,0.00,'2026-04-20 15:29:54','2026-03-20',NULL),
(9,3,5,'Investigar framework REST','Estudiar opciones de frameworks REST','mitjana','finalitzada',2,8.00,0.00,'2026-04-20 15:29:54','2026-02-20',NULL),
(10,3,1,'Implementar endpoints CRUD','Crear endpoints para CRUD de recursos','alta','en_progres',3,25.00,0.00,'2026-04-20 15:29:54','2026-03-30',NULL),
(11,3,6,'Preparar servidor para deploy','Configurar servidor de producción','critica','nova',4,10.00,0.00,'2026-04-20 15:29:54','2026-04-15',NULL);
/*!40000 ALTER TABLE `tasques` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `tipus_tasques`
--

DROP TABLE IF EXISTS `tipus_tasques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipus_tasques` (
  `id_tipus` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `descripció` text DEFAULT NULL,
  `color` varchar(7) DEFAULT '#3498db',
  `data_creacio` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_tipus`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipus_tasques`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `tipus_tasques` WRITE;
/*!40000 ALTER TABLE `tipus_tasques` DISABLE KEYS */;
INSERT INTO `tipus_tasques` VALUES
(1,'Desarrollo','Tareas de desarrollo de código','#3498db','2026-04-20 15:29:54'),
(2,'Testing','Tareas de pruebas y QA','#e74c3c','2026-04-20 15:29:54'),
(3,'Documentación','Tareas de documentación','#f39c12','2026-04-20 15:29:54'),
(4,'Diseño','Tareas de diseño y UX/UI','#9b59b6','2026-04-20 15:29:54'),
(5,'Investigación','Tareas de investigación','#1abc9c','2026-04-20 15:29:54'),
(6,'Deployment','Tareas de despliegue','#34495e','2026-04-20 15:29:54');
/*!40000 ALTER TABLE `tipus_tasques` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `usuaris`
--

DROP TABLE IF EXISTS `usuaris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuaris` (
  `id_usuari` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `cognoms` varchar(150) NOT NULL,
  `email` varchar(120) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `rol` enum('admin','gestor','empleat') DEFAULT 'empleat',
  `data_creacio` timestamp NULL DEFAULT current_timestamp(),
  `actiu` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_usuari`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_usuaris_email` (`email`),
  KEY `idx_usuaris_rol` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuaris`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `usuaris` WRITE;
/*!40000 ALTER TABLE `usuaris` DISABLE KEYS */;
INSERT INTO `usuaris` VALUES
(1,'Guillem','Riera','guillem@task.local','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','gestor','2026-04-20 15:29:54',1),
(2,'Anna','García','anna@task.local','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','empleat','2026-04-20 15:29:54',1),
(3,'Josep','Martínez','josep@task.local','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','empleat','2026-04-20 15:29:54',1),
(4,'Laura','Sánchez','laura@task.local','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','admin','2026-04-20 15:29:54',1),
(5,'Marc','López','marc@task.local','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','empleat','2026-04-20 15:29:54',1);
/*!40000 ALTER TABLE `usuaris` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-20 17:30:19
