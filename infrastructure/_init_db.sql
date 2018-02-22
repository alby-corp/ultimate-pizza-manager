CREATE TABLE ingredient (
    id 			SERIAL PRIMARY KEY,
    name       	text NOT NULL,
    price       money NOT NULL DEFAULT 0
);

CREATE TABLE typology(
	id 			SERIAL PRIMARY KEY,
	description text	NOT NULL
);

CREATE TABLE food (
	id 			SERIAL PRIMARY KEY,
    name       	text 	NOT NULL,
    price       money 	NOT NULL DEFAULT 0,
    typology    integer	NOT NULL REFERENCES typology (id)
);

CREATE TABLE food_ingredient (
	food		integer NOT NULL,
	ingredient 	integer NOT NULL
);

CREATE TABLE muppet (
	id			SERIAL PRIMARY KEY,
	username	text,
	password	text
);

CREATE TABLE delivery (
    id 			SERIAL PRIMARY KEY,
    muppet     	integer NOT NULL REFERENCES muppet (id),
	data		time
);

CREATE TABLE food_delivery (
	id			SERIAL PRIMARY KEY,
	food 		integer REFERENCES food (id),
	delivery 	integer REFERENCES delivery (id)
);

CREATE TABLE food_delivery_ingredient(
	id 				SERIAL PRIMARY KEY,
	food_delivery	integer NOT NULL REFERENCES food_delivery (id),
	ingredient 		integer NOT NULL REFERENCES ingredient (id),
	isRemoval		boolean NOT NULL
);



