import {Common} from '../model';

export const ResourceService = (function () {

    const getURI = (uri) => `api/${uri}`;

    return class {

        constructor(client) {

            this.getUsers = async () => {
                const users = await client.get(getURI('users'));
                return users.map(u => new Common.User(u.id, u.username));
            };

            this.getFoods = async () => {
                const foods = await client.get(getURI('foods'));
                return foods.map(f => new Common.Food(f.id, f.name, f.price, f.ingredients, f.type));
            };

            this.getSupplements = async () => {
                const supplements = await client.get(getURI('supplements'));
                return supplements.map(s => new Common.Ingredient(s.id, s.name, s.price));
            };

            this.getOrders = async () => {
                const orders = await client.get(getURI('orders'));
                return orders.map(order => new Common.Order(order.user, order.foods, order.date));
            };

            this.getAdministrators = async () => {
                const administrators = await client.get(getURI('administrators'));
                return administrators.map(admin => new Common.Administrator(admin.name, admin.onHoliday));
            };

            this.postOrder = (body) => {
                return client.post(getURI('orders'), body);
            };
        };
    };

})();
