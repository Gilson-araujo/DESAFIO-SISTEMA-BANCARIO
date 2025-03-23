CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,       -- Chave primária auto-incrementável
  nome VARCHAR(255) NOT NULL,   -- Nome do cliente
  data_nascimento DATE NOT NULL, -- Data de nascimento do cliente
  email VARCHAR(255) UNIQUE NOT NULL, -- Email único
  senha VARCHAR(255) NOT NULL,   -- Senha do cliente
  tipo_cliente VARCHAR(50) NOT NULL -- Tipo de cliente (por exemplo: 'normal', 'premium', etc.)
);

INSERT INTO clientes (nome, data_nascimento, email, tipo_cliente)
VALUES 
  ('João Silva', '1990-05-15', 'joao@email.com', 'normal'),
  ('Maria Oliveira', '1985-10-20', 'maria@email.com', 'premium'),
  ('Carlos Souza', '1992-03-10', 'carlos@email.com', 'normal'),
  ('Ana Costa', '1988-08-25', 'ana@email.com', 'premium'),
  ('Roberto Lima', '1995-01-30', 'roberto@email.com', 'normal');

ALTER TABLE clientes
ADD COLUMN saldo NUMERIC(10, 2) DEFAULT 0.00;