const db = require('./context');

const usersQuery = "SELECT * FROM muppet m ORDER BY m.username";

const foodWithIngredientsQuery = `  SELECT json_build_object('id', f.id, 'name', f.name, 'type', f.type, 'price', f.price, 'ingredients',
                                            (	SELECT json_agg(json_build_object('id', i.id, 'name', i.name, 'price', i.price))
                                                FROM food_ingredient fi
                                                INNER JOIN ingredient i ON fi.ingredient = i.id
                                                WHERE f.id = fi.food)
                                            ) json
                                    FROM food f`;

const ingredientsQuery =    "select distinct i.id, i.name, i.price \n" +
                            "from food f\n" +
                            "inner join food_ingredient fi on f.id = fi.food\n" +
                            "inner join ingredient i ON fi.food = i.id\n" +
                            "where i.price is not null";

function Context() {
    this.getUsers = () => db.context.execute(usersQuery);

    this.getFoods = () => db.context.execute(foodWithIngredientsQuery);

    this.getIngredients = () => db.context.execute(ingredientsQuery);
}

module.exports.context = new Context();