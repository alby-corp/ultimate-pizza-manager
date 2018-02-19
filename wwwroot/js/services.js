getMenu = () => get('menu');

getWeekOrders = () => get('getWeekOrders');

getIngredients = (id) => getById('getIngredients', id);

// Pages
getOrdersPage = () => get('order.html');

getMenuPage = () => get('menu.html');

getWeekOrdersPage = () => get('week-orders.html');