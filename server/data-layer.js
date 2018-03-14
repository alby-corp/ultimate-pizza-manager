const context = require('./context');
const uuid = require('uuid-v4');

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

const getOrdersQuery = `SELECT json_build_object(
                        'user',m.username, 'data',o.data, 'foods',      
                        (SELECT json_agg(
                            json_build_object(
                                'id', f.id, 'name', f.name, 'type', f.type, 'price', f.price,
                                'ingredients',
                                    (SELECT json_agg(json_build_object('id', i.id, 'name', i.name, 'price', i.price))
                                        FROM food_ingredient fi
                                        INNER JOIN ingredient i ON fi.ingredient = i.id
                                        WHERE f.id = fi.food
                                    ),           
                                'removals', 
                                    (SELECT json_agg(i.name)
                                        FROM "order" o
                                        JOIN food_order fo on fo.order = o.id
                                        JOIN food f on f.id = fo.food
                                        JOIN food_order_ingredient foi on foi.food_order = fo.id
                                        JOIN ingredient i on i.id = foi.ingredient
                                        WHERE foi.isremoval = true
                                    ),
                                'supplements', 
                                    (SELECT json_agg(i.name)
                                        FROM "order" o
                                        JOIN food_order fo on fo.order = o.id
                                        JOIN food f on f.id = fo.food
                                        JOIN food_order_ingredient foi on foi.food_order = fo.id
                                        JOIN ingredient i on i.id = foi.ingredient
                                        WHERE foi.isremoval = false
                                    )
                                )--end json
                            )--end json_agg      
                            FROM "order" o
                            JOIN food_order fo on fo.order = o.id
                            JOIN food f on f.id = fo.food        
                        )--end select      
                    )json --end json 
                    FROM "order" o
                    JOIN muppet m on m.id = o.muppet
                    ORDER BY data`;


const insertOrderQuery = (order) => {

    const queries = [];

    const orderId = uuid();

    queries.push(`INSERT INTO "order"(id, muppet, data) VALUES ('${orderId}', ${order.user}, NOW());`);

    order.foods.forEach(f => {
        const foodOrderId = uuid();
        queries.push(`INSERT INTO "food_order"(id, food, "order") VALUES ('${foodOrderId}', ${f.id}, '${orderId}');`);
        f.removals.forEach(s => queries.push(`INSERT INTO food_order_ingredient (food_order,ingredient, isRemoval) VALUES ('${foodOrderId}', ${s.id}, TRUE);`));
        f.supplements.forEach(s => queries.push(`INSERT INTO food_order_ingredient (food_order,ingredient, isRemoval) VALUES ('${foodOrderId}', ${s.id}, FALSE);`));
    });

    return queries;
};


function Context() {
    this.getUsers = () => context.query(usersQuery);

    this.getFoods = () => context.query(foodWithIngredientsQuery);

    this.getIngredients = () => context.query(ingredientsQuery);

    this.getSupplements = () => context.query(supplementsQuery);

    this.getOrders = () => context.query(getOrdersQuery);

    this.insertOrders = (order) => {
        return context.execute(insertOrderQuery(order));
    };
}

module.exports = new Context();