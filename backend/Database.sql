/*This file does not do anything in the project\
except is a template file which goes in mysql workbench*/
CREATE DATABASE employees;
USE employees;
CREATE TABLE employee_changes (
	ids VARCHAR(200) NOT NULL,
    status VARCHAR(10) NOT NULL
);
CREATE TABLE manager_login (
	username VARCHAR(100) NOT NULL,
	password VARCHAR(55) NOT NULL
);