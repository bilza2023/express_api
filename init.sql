CREATE DATABASE bilzadb;
USE bilzadb;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, password) VALUES
('John', 'Doe', 'john.doe@example.com', 'password1'),
('Jane', 'Doe', 'jane.doe@example.com', 'password2'),
('Bob', 'Smith', 'bob.smith@example.com', 'password3'),
('Alice', 'Smith', 'alice.smith@example.com', 'password4'),
('Chris', 'Johnson', 'chris.johnson@example.com', 'password5'),
('Emma', 'Johnson', 'emma.johnson@example.com', 'password6'),
('James', 'Williams', 'james.williams@example.com', 'password7'),
('Emily', 'Williams', 'emily.williams@example.com', 'password8'),
('David', 'Brown', 'david.brown@example.com', 'password9'),
('Katie', 'Brown', 'katie.brown@example.com', 'password10'),
('Michael', 'Jones', 'michael.jones@example.com', 'password11'),
('Olivia', 'Jones', 'olivia.jones@example.com', 'password12'),
('Richard', 'Davis', 'richard.davis@example.com', 'password13'),
('Sophia', 'Davis', 'sophia.davis@example.com', 'password14'),
('William', 'Garcia', 'william.garcia@example.com', 'password15'),
('Abigail', 'Garcia', 'abigail.garcia@example.com', 'password16'),
('Joseph', 'Martin', 'joseph.martin@example.com', 'password17'),
('Isabella', 'Martin', 'isabella.martin@example.com', 'password18'),
('Charles', 'Taylor', 'charles.taylor@example.com', 'password19'),
('Mia', 'Taylor', 'mia.taylor@example.com', 'password20');
