CREATE DATABASE IF NOT EXISTS golpe_db_simple
  DEFAULT CHARACTER SET utf8mb4;
USE golpe_db_simple;

CREATE TABLE IF NOT EXISTS golpes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

  nome VARCHAR(120) NOT NULL, 
  cidade VARCHAR(120) NOT NULL, 

  meio_contato ENUM(
    'Telefone',
    'WhatsApp',
    'Email',
    'SMS',
    'Outros'
  ) NOT NULL,

  empresa VARCHAR(160) NULL,   

  cpf VARCHAR(14) NOT NULL,

  descricao TEXT NOT NULL,   

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE golpes
  MODIFY COLUMN meio_contato ENUM('Telefone','WhatsApp','Email','SMS','Outros') NOT NULL;

SET @ix := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'golpes'
    AND index_name = 'idx_golpes_empresa'
);
SET @sql := IF(@ix = 0,
  'ALTER TABLE golpes ADD INDEX idx_golpes_empresa (empresa)',
  'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

CREATE OR REPLACE VIEW v_ranking_empresas AS
SELECT
  COALESCE(NULLIF(TRIM(empresa), ''), '(sem empresa)') AS empresa,
  COUNT(*) AS total
FROM golpes
GROUP BY COALESCE(NULLIF(TRIM(empresa), ''), '(sem empresa)');