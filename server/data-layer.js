const db = require('./context');
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


const insertOrderQuery = (orders) => orders.map(
    (order) => {
        const orderID = uuid();
        orderQuery = `DO $$ BEGIN PERFORM InsertOrder('${orderID}',${order.user.id},LOCALTIMESTAMP); END$$; \n`
        orderQuery +=   order.foods.map(
                            (food) => {
                                const foodID = uuid();
                                foodQuery = `DO $$ BEGIN PERFORM InsertFood('${foodID}',${food.id},'${orderID}'); END$$;  \n`;
                                foodQuery += food.removals.map(
                                    (removal) =>  `DO $$ BEGIN PERFORM InsertIngredients('${foodID}',${removal.id},true); END$$; \n`
                                ).join('');
                                foodQuery += food.supplements.map(
                                     (supplement) =>  `DO $$ BEGIN PERFORM InsertIngredients('${foodID}',${supplement.id},false); END$$; \n`
                                ).join('');
                                return foodQuery}
                        ).join('');
                        return orderQuery;        
                    }
        ).join();
                    

function Context() {
    this.getUsers = () => db.context.execute(usersQuery);

    this.getFoods = () => db.context.execute(foodWithIngredientsQuery);

    this.getIngredients = () => db.context.execute(ingredientsQuery);

    this.getSupplements = () => db.context.execute(supplementsQuery);

    this.getOrders = () => db.context.execute(getOrdersQuery);

    this.insertOrders = (orders) => db.context.execute(insertOrderQuery(orders));
    
}

module.exports.context = new Context();