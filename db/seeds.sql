USE db.sql;

--insert some employees
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('1', 'Service Advisor', '75000', '1');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('2', 'Service Writer', '60000', '1');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('3', 'Lead Mechanic', '70000', '2');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('4', 'Spray Technician', '65000', '2');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('5', 'Account Manager', '90000', '1' );
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('6', 'Accountant', '100000', '3');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('7', 'Legal Lead', '175000', '4');
INSERT INTO `db.sql`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('8', 'Lawyer', '160000', '4');


--insert some depts
INSERT INTO `db.sql`.`department` (`id`, `name`) VALUES ('1', 'Service');
INSERT INTO `db.sql`.`department` (`id`, `name`) VALUES ('2', 'Automotive');
INSERT INTO `db.sql`.`department` (`id`, `name`) VALUES ('3', 'Financial');
INSERT INTO `db.sql`.`department` (`id`, `name`) VALUES ('4', 'Legal');


-- insert roles

INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('1', 'Jake', 'Anderson', '1', '3');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('2', 'Tony', 'Jacobson', '2', '1');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('3', 'Samantha', 'Jorgenson', '3');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('4', 'Michael', 'Brown', '4', '3');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('5', 'Javon', 'Yosh', '6');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('6', 'Talia', 'Laurey', '7');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`) VALUES ('7', 'David', 'Wells', '7');
INSERT INTO `db.sql`.`employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('8', 'Dimitri', 'Nathanson', '2', '4');
