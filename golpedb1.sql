CREATE DATABASE IF NOT EXISTS golpe_db_simple
  DEFAULT CHARACTER SET utf8mb4;
USE golpe_db_simple;

CREATE TABLE `golpes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  `cidade` VARCHAR(120) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `meio_contato` ENUM('Telefone','WhatsApp','Email','SMS','Outros') NOT NULL,
  `descricao` TEXT NOT NULL,
  `email_telefone` VARCHAR(120) NOT NULL,
  `empresa_id` INT UNSIGNED DEFAULT NULL,
  `empresa` VARCHAR(120) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_empresa_id` (`empresa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

