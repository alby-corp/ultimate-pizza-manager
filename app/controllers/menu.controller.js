import template from '../views/menu.html';

import {Table, FoodRow, IngredientRow} from '../model';
import {BaseController} from "./base.controller";


export const MenuController = (function () {

    const privateProps = new WeakMap();

    return class MenuController extends BaseController {

        constructor(services) {
            super(template);

            privateProps.set(this, {
                service: services[0],
                alertService: services[1]
            });
        }

        async execute() {
            let menu;

            try {
                menu = await privateProps.get(this).service.getFoods();
            } catch (error) {
                privateProps.get(this).alertService.error(`Message: ${error.statusCode || ''} ${error.message}`);
                return;
            }

            const pizzasMenuTable = $('#pizzas-menu');
            new Table(pizzasMenuTable, menu.filter(food => food.type === 1).map(food => new FoodRow(food))).populate();

            const cookingMenuTable = $('#cooking-menu');
            new Table(cookingMenuTable, menu.filter(food => food.type === 2).map(food => new FoodRow(food))).populate();

            const sandwichesMenuTable = $('#sandwiches-menu');
            new Table(sandwichesMenuTable, menu.filter(food => food.type === 4).map(food => new FoodRow(food))).populate();

            const dessertMenuTable = $('#desserts-menu');
            new Table(dessertMenuTable, menu.filter(food => food.type === 3).map(food => new FoodRow(food))).populate();

            let supplements;

            try {
                supplements = await privateProps.get(this).service.getSupplements;
            } catch (error) {
                return;
            }

            const supplementsMenuTable = $('#supplements-menu');
            new Table(supplementsMenuTable, supplements.map(ingredient => new IngredientRow(ingredient))).populate();

            return this;
        }
    };

})();