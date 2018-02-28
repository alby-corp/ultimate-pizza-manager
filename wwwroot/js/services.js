getMenu = () => get('menu');

getWeekOrders = () => get('getWeekOrders');

getIngredients = (id) => getById('getIngredients', id);

getUsers = async () => {
    const users = await get('users');
    return users.map(u => new User(u.id, u.username));
};

getFoods = async () => {
    const foods = await get('foods');
    return foods.map(f => new Food(f.id, f.name, f.price, (f.ingredients || [] ).map(i => new Ingredient(i.id, i.name, i.price)), f.type));
};

// Pages
getOrdersPage = () => get('order.html');

getMenuPage = () => get('menu.html');

getWeekOrdersPage = () => get('week-orders.html');