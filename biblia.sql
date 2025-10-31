
-- ===========================================
-- 📘 Base de Dados: biblia_db
-- Projeto: Dantas pelo Mundo
-- Estrutura criada para suportar todas as versões da Bíblia
-- ===========================================

CREATE DATABASE IF NOT EXISTS biblia_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblia_db;

-- ========================
-- Tabela 1: livros
-- ========================
CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  abreviatura VARCHAR(20) NOT NULL,
  testamento ENUM('AT', 'NT') NOT NULL,  -- Antigo ou Novo Testamento
  ordem INT NOT NULL                      -- ordem dentro da Bíblia
);

-- ========================
-- Tabela 2: capitulos
-- ========================
CREATE TABLE capitulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  livro_id INT NOT NULL,
  numero INT NOT NULL,
  FOREIGN KEY (livro_id) REFERENCES livros(id)
    ON DELETE CASCADE
);

-- ========================
-- Tabela 3: versiculos
-- ========================
CREATE TABLE versiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  capitulo_id INT NOT NULL,
  numero INT NOT NULL,
  texto TEXT NOT NULL,
  FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
    ON DELETE CASCADE
);

-- ========================
-- Tabela 4 (opcional): indice_pesquisa
-- ========================
-- Esta tabela ajuda a fazer buscas rápidas por palavras.
CREATE TABLE indice_pesquisa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  palavra VARCHAR(50),
  versiculo_id INT,
  FOREIGN KEY (versiculo_id) REFERENCES versiculos(id)
    ON DELETE CASCADE
);

-- ========================
-- Dados iniciais (exemplo)
-- ========================
INSERT INTO livros (nome, abreviatura, testamento, ordem)
VALUES
('Génesis', 'Gn', 'AT', 1),
('Êxodo', 'Ex', 'AT', 2),
('Levítico', 'Lv', 'AT', 3),
('Mateus', 'Mt', 'NT', 40),
('Marcos', 'Mc', 'NT', 41),
('Lucas', 'Lc', 'NT', 42),
('João', 'Jo', 'NT', 43);

-- Capítulos e versículos de exemplo
INSERT INTO capitulos (livro_id, numero) VALUES
(1, 1), (1, 2), (2, 1), (4, 1);

INSERT INTO versiculos (capitulo_id, numero, texto) VALUES
(1, 1, 'No princípio criou Deus os céus e a terra.'),
(1, 2, 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.'),
(3, 1, 'Então disse Deus a Moisés: Sobe ao Senhor, tu e Arão.'),
(4, 1, 'Livro da genealogia de Jesus Cristo, filho de David, filho de Abraão.');
