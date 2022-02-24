DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE dept(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id int(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    income DECIMAL(12) NOT NULL,
    dept_id INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE employees(
    id INTEGER(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(11) NOT NULL,
    manager_id INTEGER(11),
    PRIMARY KEY (id)
);


