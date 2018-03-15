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

const getOrdersQuery = `WITH foodCte AS 
    (
	    SELECT fo.order as orderID, json_build_object(
                'id', f.id, 'name', f.name, 'type', f.type, 'price', f.price
                ,'ingredients'
                , COALESCE(json_agg(json_build_object(
                    'id', i.id, 'name', i.name, 'price', i.price)) 
			    	FILTER ( WHERE ( i.id IS NOT NULL)),'[]')
     	    	,'removals', COALESCE(json_agg(
                    CASE WHEN foi.isremoval = true THEN json_build_object(
                        'id', i.id, 'name', i.name, 'price', i.price) END) 
                    FILTER ( WHERE (CASE WHEN foi.isremoval = true 
                        THEN json_build_object(
                            'id', i.id, 'name', i.name, 'price', i.price) 
                        END) IS NOT NULL),'[]')	
			    ,'supplements', COALESCE(json_agg(
                    CASE WHEN foi.isremoval = false THEN json_build_object(
                        'id', i.id, 'name', i.name, 'price', i.price) END) 
                    FILTER ( WHERE (CASE WHEN foi.isremoval = false 
                        THEN json_build_object(
                            'id', i.id, 'name', i.name, 'price', i.price)
                        END) IS NOT NULL),'[]')	
                ) as foodJson
    	FROM food_order fo 
	    JOIN food f on f.id = fo.food
    	LEFT JOIN food_order_ingredient foi on foi.food_order = fo.id
	    LEFT JOIN ingredient i on i.id = foi.ingredient
	    GROUP BY fo.id,f.id, f.name, f.type, f.price 
    ) 
    SELECT json_build_object('user', m.username, 'data', o.data, 'foods', json_agg(foodJson))
    FROM foodCte fcte
    JOIN "order" o on o.id = fcte.OrderId
    JOIN muppet m on m.id = o.muppet
    GROUP BY o.id,m.username,o.data
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