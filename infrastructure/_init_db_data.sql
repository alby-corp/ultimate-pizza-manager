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


