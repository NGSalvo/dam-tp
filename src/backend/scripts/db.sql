CREATE DATABASE IF NOT EXISTS dam_fiuba;

USE dam_fiuba;

CREATE TABLE IF NOT EXISTS solenoid_valve (
	id INT auto_increment,
	name VARCHAR(45),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS device (
	id INT auto_increment,
	name VARCHAR(200),
	location VARCHAR(200),
	solenoid_valve_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(solenoid_valve_id) REFERENCES solenoid_valve(id)
);

CREATE TABLE IF NOT EXISTS measurement (
	id INT auto_increment,
	date_of_measurement DATETIME,
	value VARCHAR(100),
	device_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(device_id) REFERENCES device(id)
);

CREATE TABLE IF NOT EXISTS irrigation_log (
	id INT auto_increment,
	opened TINYINT,
	date_of_log DATETIME,
	solenoid_valve_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(solenoid_valve_id) REFERENCES solenoid_valve(id)
);





INSERT INTO dam_fiuba.solenoid_valve (name)
VALUES  ('eLPatio'),
        ('eLCocina'),
		    ('eLJardinDelantero'),
		    ('eLLiving'),
		    ('eLHabitacion1'),
		    ('eLHabitacion2');


INSERT INTO dam_fiuba.device (name, location, solenoid_valve_id)
VALUES  ('Sensor 1', 'Patio',1),
		    ('Sensor 2', 'Cocina',2),
		    ('Sensor 3', 'Jardin Delantero',3),
		    ('Sensor 4', 'Living',4),
		    ('Sensor 5', 'Habitacion 1',5),
		    ('Sensor 6', 'Habitacion 2',6);


INSERT INTO dam_fiuba.measurement (date_of_measurement, value, device_id)
VALUES  (current_timestamp(),60,1 ),
		    (current_timestamp(),40,1 ),
		    (current_timestamp(),30,2 ),
		    (current_timestamp(),50,3 ),
		    (current_timestamp(),33,5 ),
		    (current_timestamp(),17,4 ),
		    (current_timestamp(),29,6 ),
		    (current_timestamp(),20,1 ),
		    (current_timestamp(),44,4 ),
		    (current_timestamp(),61,5 ),
		    (current_timestamp(),12,2 );