getUsers = async () => {
    const users = await get('users');
    return users.map(u => new AlbyJs.Common.User(u.id, u.username));
};

getFoods = async () => {
    const foods = await get('foods');
    return foods.map(f => new AlbyJs.Common.Food(f.id, f.name, f.price, f.ingredients, f.type));
};

getSupplements = async () => {
    const supplements = await get('supplements');
    return supplements.map(s => new AlbyJs.Common.Ingredient(s.id, s.name, s.price));
};

getOrders = async () => {

    const orders = await get('orders');
    return orders.map(order => new AlbyJs.Common.Order(order.user, order.foods, order.date));
};

getAdministrators = async () => {
    const administrators = await get('administrators');
    return administrators.map(admin => new AlbyJs.Common.Administrator(admin.name, admin.onHoliday));
};

// Alert service
alertService = (message) => {
    alert(message);
};

// Pages
getMenu = () => get('menu');

getOrdersPage = () => get('order.html');

getMenuPage = () => get('menu.html');

getWeekOrdersPage = () => get('week-orders.html');

getInfoPage = () => get('info.html');