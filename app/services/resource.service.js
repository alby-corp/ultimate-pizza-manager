import {Common} from '../model';

export const ResourceService = (function () {

    return class {

        constructor(client) {

            this.getUsers = async () => {
                const users = await client.get('users');
                return users.map(u => new Common.User(u.id, u.username));
            };

            this.getFoods = async () => {
                const foods = await client.get('foods');
                return foods.map(f => new Common.Food(f.id, f.name, f.price, f.ingredients, f.type));
            };

            this.getSupplements = async () => {
                const supplements = await client.get('supplements');
                return supplements.map(s => new Common.Ingredient(s.id, s.name, s.price));
            };

            this.getOrders = async () => {
                const orders = await client.get('orders');
                return orders.map(order => new Common.Order(order.user, order.foods, order.date));
            };

            this.getAdministrators = async () => {
                const administrators = await client.get('administrators');
                return administrators.map(admin => new Common.Administrator(admin.name, admin.onHoliday));
            };

            this.getFoodTypes = async () => {
                const foodTypes = await client.get('foodTypes');
                return foodTypes.map(ft => new Common.FoodTypes(ft.id, ft.description));
            };

            this.postOrder = (body) => {
                return client.post('orders', body);
            };
        };
    };

})();
