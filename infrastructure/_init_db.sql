CREATE EXTENSION "uuid-ossp";

CREATE TABLE ingredient (
    id 			SERIAL PRIMARY KEY,
    name       	text NOT NULL,
    price       money
);

CREATE TABLE type(
	id 			SERIAL PRIMARY KEY,
	description text	NOT NULL
);

CREATE TABLE dough(
    id 			SERIAL PRIMARY KEY,
    description text
);

CREATE TABLE food (
	  id 			SERIAL PRIMARY KEY,
    name       	text 	NOT NULL,
    price       money 	NOT NULL DEFAULT 0,
    type    integer	NOT NULL REFERENCES type (id)
);

CREATE TABLE food_ingredient (
	food		integer NOT NULL,
	ingredient 	integer NOT NULL
);

CREATE TABLE muppet (
	id			  SERIAL PRIMARY KEY,
	username	text,
	password	text
);

CREATE TABLE "order" (
    id 			uuid PRIMARY KEY,
    muppet     	integer NOT NULL REFERENCES muppet (id),
  	data		    timestamp
);

CREATE TABLE food_order (
	id			uuid PRIMARY KEY,
	food 		integer REFERENCES food (id),
	"order" 	uuid REFERENCES "order" (id)
);

CREATE TABLE food_order_ingredient(
	id 				SERIAL PRIMARY KEY,
	food_order		uuid NOT NULL REFERENCES food_order (id),
	ingredient 		integer NOT NULL REFERENCES ingredient (id),
	isRemoval		boolean NOT NULL
);
