const db = require('./context');

const usersQuery = "SELECT * FROM muppet m ORDER BY m.username";

const foodWithIngredientsQuery = `  SELECT json_build_object('id', f.id, 'name', f.name, 'type', f.type, 'price', f.price, 'ingredients',
                                            (	SELECT json_agg(json_build_object('id', i.id, 'name', i.name, 'price', i.price))
                                                FROM food_ingredient fi
                                                INNER JOIN ingredient i ON fi.ingredient = i.id
                                                WHERE f.id = fi.food)
                                            ) json
                                    FROM food f
                                    ORDER BY f.name`;

const supplementsQuery = `  SELECT DISTINCT i.id, i.name, i.price
                            FROM food_ingredient fi
                            INNER JOIN ingredient i ON fi.ingredient = i.id
                            WHERE i.price IS NOT NULL
                            ORDER BY i.name`;

const ingredientsQuery = `  SELECT * FROM Ingredient`;

function Context() {
    this.getUsers = () => db.context.execute(usersQuery);

    this.getFoods = () => db.context.execute(foodWithIngredientsQuery);

    this.getIngredients = () => db.context.execute(ingredientsQuery);

    this.getSupplements = () => db.context.execute(supplementsQuery);
}

module.exports.context = new Context();