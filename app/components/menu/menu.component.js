import template from './menu.html';

import {Table, FoodRow, IngredientRow} from '../../model/index';
import {BaseComponent} from "../base.component";


export const MenuComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(service, alertService) {
            super();

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        get template() {
            return template;
        }


        async execute() {
            let menu;

            try {
                menu = await super.invokeWithCatcher(privateProps.get(this).service.getFoods);
            } catch (error) {
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
                supplements = await super.invokeWithCatcher(privateProps.get(this).service.getSupplements);
            } catch (error) {
                return;
            }

            const supplementsMenuTable = $('#supplements-menu');
            new Table(supplementsMenuTable, supplements.map(ingredient => new IngredientRow(ingredient))).populate();

            return this;
        }
    };

})();