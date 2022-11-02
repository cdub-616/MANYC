/*This file does not do anything in the project\
except is a template file which goes in mysql workbench*/
CREATE DATABASE employees;
USE employees;
CREATE TABLE employee_changes (
	id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    ids VARCHAR(200) NOT NULL,
    status VARCHAR(10) NOT NULL
);