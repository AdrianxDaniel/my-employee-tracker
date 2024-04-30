DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE vaults (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    vault_id INTEGER NOT NULL,
    FOREIGN KEY (vault_id) 
    REFERENCES vaults(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) 
    REFERENCES roles(id),
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id) 
    ON DELETE SET NULL
);