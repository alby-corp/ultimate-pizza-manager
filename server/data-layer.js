const context = require('./context');
const uuid = require('uuid-v4');

const usersQuery = `                WITH users AS (
                                       SELECT m.id, m.username
                                       FROM muppet m
                                       ORDER BY m.username
                                    )

                                    SELECT json_agg(u) FROM users u`;

const foodsQuery = `                WITH foods AS 	(	
                                        SELECT          f.id, f.name, f.type, f.price, COALESCE(json_agg(i) FILTER (WHERE i.id IS NOT NULL), '[]') as ingredients						
                                        FROM food       f
                                        LEFT JOIN       food_ingredient fi ON f.id = fi.food
                                        LEFT JOIN       ingredient i ON fi.ingredient = i.id
                                        GROUP BY        f.id, f.name, f.type, f.price
                                        ORDER BY        f.name
                                    )
                                    
                                    SELECT json_agg(f) FROM foods f`;

const supplementsQuery = `          WITH supplements AS (
                                        SELECT DISTINCT i.id, i.name, i.price
                                        FROM            ingredient i
                                        WHERE           i.price IS NOT NULL
                                        ORDER BY        i.name
                                    )
                                    
                                    SELECT json_agg(s) FROM supplements s`;

const ordersQuery = `               WITH order_foods_cte AS (
                                        SELECT 
                                                        fo.order as order_id, 
                                                        f.id, f.name, f.type, f.price, 
                                                        COALESCE(json_agg(r) FILTER (WHERE r.id IS NOT NULL), '[]') AS removals ,
                                                        COALESCE(json_agg(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS supplements 
                                        FROM 			food f 
                                        INNER JOIN 		food_order fo on f.id = fo.food
                                        LEFT JOIN 		food_order_ingredient foi on foi.food_order = fo.id
                                        LEFT JOIN 		ingredient r on r.id = foi.ingredient AND foi.isremoval = TRUE
                                        LEFT JOIN 		ingredient s on s.id = foi.ingredient AND foi.isremoval = FALSE
                                        GROUP BY 		fo.id, f.id, f.name, f.type, f.price 
                                    )
                                    ,order_cte AS (
                                        SELECT 			
                                                        m.id as user_id, 
                                                        m.username as user_name, 
                                                        o.date,
                                                        f.order_id,
                                                        json_build_object('food', json_build_object('id', f.id, 'name', f.name, 'type', f.type, 'price', f.price), 'removals', f.removals, 'supplements', f.supplements) AS foods
                                        FROM 			order_foods_cte f
                                        INNER JOIN 		"order" o ON f.order_id = o.id
                                        INNER JOIN		muppet m ON o.muppet = m.id
                                    )
                                    ,grouped_order_cte AS (
                                        SELECT json_build_object('id', o.user_id, 'name', o.user_name) as user, o.date, json_agg(o.foods) as foods FROM "order_cte" o GROUP BY o.user_id, o.user_name, o.date, o.order_id
                                    )
                                    
                                    SELECT json_agg(to_json(go)) FROM grouped_order_cte go`;

const insertQueryFactory = (order) => {
                                    const queries = [];

                                    const orderId = uuid();
                                    queries.push(`INSERT INTO "order"(id, muppet, date) VALUES ('${orderId}', ${order.user.id}, NOW());`);

                                    order.foods.forEach(f => {
                                        const foodOrderId = uuid();
                                        queries.push(`INSERT INTO "food_order"(id, food, "order") VALUES ('${foodOrderId}', ${f.food.id}, '${orderId}');`);
                                        f.removals.forEach(s => queries.push(`INSERT INTO food_order_ingredient (food_order,ingredient, isRemoval) VALUES ('${foodOrderId}', ${s.id}, TRUE);`));
                                        f.supplements.forEach(s => queries.push(`INSERT INTO food_order_ingredient (food_order,ingredient, isRemoval) VALUES ('${foodOrderId}', ${s.id}, FALSE);`));
                                    });

                                    return queries;
};

function DataLayer() {

    this.getUsers = () => context.scalar(usersQuery);

    this.getFoods = () => context.scalar(foodsQuery);

    this.getSupplements = () => context.scalar(supplementsQuery);

    this.getOrders = () => context.scalar(ordersQuery);

    this.insertOrders = (order) => context.execute(insertQueryFactory(order));
}

module.exports = new DataLayer();