CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(255) NOT NULL,
	"status" BOOLEAN DEFAULT FALSE
	);