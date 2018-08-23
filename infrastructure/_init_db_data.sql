INSERT INTO public.muppet(username, password) VALUES
('alberto', NULL), ('roald', NULL),	('yanier', NULL);

INSERT INTO dough(id, description)VALUES
(1, 'classico'), (2, 'alle Olive');

-- types:
-- 1: pizza
-- 2: kitchen
-- 3: dessert
-- 4: sandwich
INSERT INTO "type" (id, description) VALUES
(1, 'pizza'), (2, 'kitchen'), (3, 'dessert'), (4, 'sandwich');

INSERT INTO public.food(id, name, price, type) VALUES
(1, 'Marinara', 3.50, 1), (2, 'Margherita', 4.00, 1), (3, 'Prosciutto', 5.00, 1), (4, 'Funghi', 5.00, 1), (5, 'Diavola', 5.00, 1),
(6, 'Pollo Disossato e Patate', 7.00, 2), (7, 'Insalata', 3.00, 2),
(8, 'Pizza Nutella', 5.00, 3),
(9, 'Sfizioso', 6.00, 4);

INSERT INTO ingredient(id, name, price) VALUES
(1, 'Pomodoro', 1.00), (2, 'Mozzarella', 1.00), (3, 'Aglio', NULL), (4, 'Olio', NULL),
(5, 'Prosciutto Cotto', 1.00), (6, 'Funghi', 1.00), (7, 'Salamino Piccante', 1.50), (8, 'Porchetta', NULL), (9, 'Formaggio', NULL),
(10, 'Maionese', NULL);

INSERT INTO food_ingredient (food, ingredient) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2),
(3, 1), (3, 2), (3, 5),
(4, 1), (4, 2), (4, 6),
(5, 1), (5, 2), (5, 7),
(9, 8), (9, 9), (9, 10), (9, 6);

INSERT INTO public.food_ingredient (food, ingredient) VALUES (82, 48);
INSERT INTO public.food_ingredient (food, ingredient) VALUES (82, 16);
INSERT INTO public.food_ingredient (food, ingredient) VALUES (82, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (82, 78); -- Maionese

INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 74); -- Hamburgher
INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 77); -- Salsa rosa
INSERT INTO public.food_ingredient (food, ingredient) VALUES (83, 41); -- Patatine

INSERT INTO public.food_ingredient (food, ingredient) VALUES (84, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (84, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (84, 41); -- Patatine
INSERT INTO public.food_ingredient (food, ingredient) VALUES (84, 71); -- Wurstel
INSERT INTO public.food_ingredient (food, ingredient) VALUES (84, 76); -- Ketchup

INSERT INTO public.food_ingredient (food, ingredient) VALUES (85, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (85, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (85, 77); -- Salsa rosa
INSERT INTO public.food_ingredient (food, ingredient) VALUES (85, 50); -- Prosciutto Cotto

INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 74); -- Hamburgher
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 77); -- Salsa rosa
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 49); -- Prosciutto
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (86, 16); -- Funghi

INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 74); -- Hamburgher
INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 77); -- Salsa rosa
INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (87, 65); -- Speck

INSERT INTO public.food_ingredient (food, ingredient) VALUES (88, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (88, 78); -- Maionese
INSERT INTO public.food_ingredient (food, ingredient) VALUES (88, 51); -- Prosciutto Crudo
INSERT INTO public.food_ingredient (food, ingredient) VALUES (88, 31); -- Mozz. Bufala
INSERT INTO public.food_ingredient (food, ingredient) VALUES (88, 36); -- Origano

INSERT INTO public.food_ingredient (food, ingredient) VALUES (89, 75); -- Formaggio
INSERT INTO public.food_ingredient (food, ingredient) VALUES (89, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (89, 77); -- Salsa rosa
INSERT INTO public.food_ingredient (food, ingredient) VALUES (89, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (89, 10); -- Verd. Miste

INSERT INTO public.food_ingredient (food, ingredient) VALUES (90, 78); -- Maionese
INSERT INTO public.food_ingredient (food, ingredient) VALUES (90, 79); -- Insalata
INSERT INTO public.food_ingredient (food, ingredient) VALUES (90, 36); -- Origano
INSERT INTO public.food_ingredient (food, ingredient) VALUES (90, 46); -- Pomodoro
INSERT INTO public.food_ingredient (food, ingredient) VALUES (90, 67); -- Pomodoro


