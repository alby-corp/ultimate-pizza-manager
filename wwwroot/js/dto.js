class UserDTO {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class IngredientDTO {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class FoodDTO {
    constructor(id, name, ingredients, price, type, supplements, removals) {

        if (!ingredients instanceof Array && !ingredients.some((ingredient) => ingredient instanceof Food)) {
            throw 'Ingredients property have to be instance of Array of Ingredient';
        }

        if (!supplements instanceof Array && !supplements.some((supplement) => supplement instanceof Food)) {
            throw 'Supplements property have to be instance of Array of Ingredient';
        }

        if (!removals instanceof Array && !removals.some((removal) => removal instanceof Food)) {
            throw 'Removals property have to be instance of Array of Ingredient';
        }

        this.id = id;
        this.name = name;
        this.ingredients = ingredients.map(i => i.toDTO());
        this.price = price;
        this.type = type;
        this.supplements = supplements.map(s => s.toDTO());
        this.removals = removals.map(r => r.toDTO());
    }
}

class OrderDTO {
    constructor(user, foods, data) {

        if (!user instanceof User) {
            throw 'User property have to be instance of User';
        }

        if (!foods instanceof Array && !foods.some((food) => food instanceof Food)) {
            throw 'Foods property have to be instance of Array of Foods';
        }

        if (!data instanceof Date) {
            throw 'Date property have to be instance of Date';
        }

        this.user = user.toDTO();
        this.foods = foods.map(f => f.toDTO());
        this.data = data;
    }
}