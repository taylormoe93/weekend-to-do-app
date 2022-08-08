CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(255) NOT NULL,
	"status" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO tasks
	("task")
	
VALUES ('Go to store'), ('Pick up eggs'), ('Paint the fence');

SELECT * FROM "tasks"
