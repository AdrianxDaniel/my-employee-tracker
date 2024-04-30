INSERT INTO Vaults (name)
VALUES ('Vault 001'),
       ('Vault 014'),
       ('Vault 039'),
       ('Vault 078'),
       ('Vault 111'),
       ('Vault 117');

INSERT INTO roles (title, salary, vault_id)
VALUES ('Overseer', 1000, 1), -- 1
       ('Overseer', 1000, 2),
       ('Vault Security', 500, 1), -- 3
       ('Vault Security', 500, 2),
       ('Vault Doctor', 800, 1), -- 5
       ('Vault Doctor', 800, 3),
       ('Vault Engineer', 200, 1), --7
       ('Vault Engineer', 200, 4),
       ('Vault Dweller', 50, 1), -- 9
       ('Vault Dweller', 50, 5),
       ('Vault Teachers', 20, 1), -- 11
       ('Vault Teachers', 20, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ikail', 'Mendez', 1, null),
       ('John', '-117', 2, null),
       ('Mia', 'Buick', 5, 1),
       ('Carlos', 'Santana', 3, 1),
       ('Miklo', 'Hernandez', 4, 2),
       ('Henry', 'Geller', 4, 2),
       ('Oliver', 'Reznov', 5, 1),
       ('Ericka', 'Albright', 6, null);
       