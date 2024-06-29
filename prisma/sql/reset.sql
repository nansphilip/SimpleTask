-- Afficher la liste des utilisateurs
SELECT User, Host FROM mysql.user;

-- Supprimer un utilisateur
DROP USER 'simple-task-user'@'localhost';

-- Afficher les privilèges d'un utilisateur
SHOW GRANTS FOR 'simple-task-user'@'localhost';

-- Supprimer tous les privilèges d'un utilisateur
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'simple-task-user'@'localhost';

-- Assurer la mise à jour des privilèges après leur suppression
FLUSH PRIVILEGES;

-- Supprimer la base de donnée
DROP DATABASE `simple-task-db`;
