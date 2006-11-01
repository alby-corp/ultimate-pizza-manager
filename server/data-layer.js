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

const ordersQuery = `SELECT json_build_object(
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



const insertOrderQuery = function getInsertOrderQuery(newOrderList){
    newOrderList.Foreach(
        function (newOrder) {
            orderQuery = "INSERT INTO \"order\" (muppet,data)" + 
            "VALUES ((SELECT id FROM muppet WHERE userName = '" + newOrder.user +" '),LOCALTIMESTAMP);" ;
            newOrder.foodOrdered.Foreach(
                function (foodOrdered) {
                    orderQuery += "INSERT INTO food_order (food,\"order\")" +
                    "VALUES ((SELECT id FROM food WHERE name = '" + foodOrdered.foodName + "')," +
                    "        (SELECT id FROM \"order\" ORDER BY id DESC LIMIT 1));";
                    foodOrdered.ingredientOrderedList.Foreach(
                        function(ingredientOrdered){
                            orderQuery += "INSERT INTO food_order_ingredient (food_order,ingredient,isremoval)" +
                            "VALUES ((SELECT id FROM food_order ORDER BY id DESC LIMIT 1)," +
                            "(SELECT id FROM ingredient WHERE name = '" + ingredientOrdered.ingredientName + 
                            "')," + ingredientOrdered.isremoval +");";
                        })
                    
                })
        }
    )
    return orderQuery;
}

function Context() {
    this.getUsers = () => db.context.execute(usersQuery);

    this.getFoods = () => db.context.execute(foodWithIngredientsQuery);

    this.getIngredients = () => db.context.execute(ingredientsQuery);

    this.getSupplements = () => db.context.execute(supplementsQuery);

    this.getOrders = () => db.context.execute(ordersQuery);
}

module.exports.context = new Context();