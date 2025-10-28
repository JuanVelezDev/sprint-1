
INSERT INTO users (name, email, password)
VALUES 
('Usuario Demo', 'demo@correo.com', '$2b$10$kHwYvG9b1dVzUDp8oSM.uepZjLlb8wXG3X1XP5mQWoeOZqZyU06SW'); 
-- password = 123456


INSERT INTO tasks (title, description, status, user_id)
VALUES 
('Aprender NestJS', 'Completar el tutorial de NestJS oficial', 'pending', 1),
('Configurar PostgreSQL', 'Instalar y probar conexión local con la BD', 'completed', 1),
('Probar API con Postman', 'Enviar requests CRUD a /tasks', 'pending', 1);