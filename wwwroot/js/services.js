getUsers = async () => {
    const users = await get('users');
    return users.map(u => new User(u.id, u.username));
};

getFoods = async () => {
    const foods = await get('foods');
    return foods.map(f => new Food(f.id, f.name, f.price, (f.ingredients || []).map(i => new Ingredient(i.id, i.name, i.price)), f.type));
};

getSupplements = async () => {
    const supplements = await get('supplements');
    return supplements.map(s => new Ingredient(s.id, s.name, s.price));
};

alertService = (message) => {
    alert(message);
};

getMenu = () => get('menu');


getWeekOrders = async () => {
    let orders = await get('getWeekOrders');
    // let json = orders.map(order => order.json);

    return orders.map(order => new Order(
        order.user,
        order.foods.map(food => new Food(
            food.id,
            food.name,
            food.price,
            food.ingredients.map(s => new Ingredient(s.id, s.name, s.price)),
            food.type,
            food.supplements.map(s => new Ingredient(s.id, s.name, s.price)),
            food.removals.map(r => new Ingredient(r.id, r.name, r.price))
        )),
        order.data
    ));
};

// Pages
getOrdersPage = () => get('order.html');

getMenuPage = () => get('menu.html');

getWeekOrdersPage = () => get('week-orders.html');