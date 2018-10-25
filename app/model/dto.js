import {Common} from '../../server/model';

class UserDTO {
    constructor(id) {
        if (!id instanceof Number) {
            throw new Error('User id has to be integer');
        }

        this.id = id;
    }
}

class IngredientDTO {
    constructor(id) {

        if (!id instanceof Number) {
            throw new Error('Ingredient id has to be number');
        }

        this.id = id;
    }
}

class OrderedFoodDTO {
    constructor(orderedFood) {

        if (!orderedFood instanceof Common.OrderedFood) {
            throw 'Order has to be instance of AlbyJs.Common.OrderedFood';
        }

        this.id = orderedFood.food.id;
        this.supplements = orderedFood.supplements.map(s => new IngredientDTO(s.id));
        this.removals = orderedFood.removals.map(r => new IngredientDTO(r.id));
    }
}

export class OrderDTO {
    constructor(order) {

        if (!order instanceof Common.Order) {
            throw 'Order has to be instance of AlbyJs.Common.Order';
        }

        this.foods = order.foods.map(orderedFood => new OrderedFoodDTO(orderedFood));
        this.data = order.data;
    }
}