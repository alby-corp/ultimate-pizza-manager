import template from '../views/form.html';

import {Option, Common, Order, DropDownList, Button} from '../model';
import {BaseController} from "./base.controller";
import {ChatController} from "./chat.controller";

export const FormController = (function () {

    let usersDDL;

    let kitchenDDL;
    let dessertsDDL;

    let pizzasDDL;
    let supplementsDDL;
    let removalsDDL;

    let sandwichesDDL;
    let sandwichesSupplementsDDL;
    let sandwichesRemovalsDDL;


    const initDDLs = () => {
        usersDDL = $('#users');

        kitchenDDL = $('#kitchen');
        dessertsDDL = $('#desserts');

        pizzasDDL = $('#pizzas');
        supplementsDDL = $('#supplements');
        removalsDDL = $('#removals');

        sandwichesDDL = $('#sandwiches');
        sandwichesSupplementsDDL = $('#sandwiches-supplements');
        sandwichesRemovalsDDL = $('#sandwiches-removals');
    };

    const privateProps = new WeakMap();

    const buildSupplementsFactory = (foods, supplements) => (DDL, masterDDL) =>
        new DropDownList(DDL, getIngredientsOptions(supplements, Common.Ingredient.prototype.toString))
            .populate()
            .conditionalEnable(masterDDL)
            .autoRefresh(
                masterDDL,
                (id) => id
                    ? getIngredientsOptions(exception(supplements, foods.find(f => f.id === +id).ingredients), Common.Ingredient.prototype.toString)
                    : getIngredientsOptions(supplements, Common.Ingredient.prototype.toString)
            );

    const buildRemovalFactory = (foods) => (DDL, masterDDL) =>
        new DropDownList(DDL, null)
            .conditionalEnable(masterDDL)
            .autoRefresh(
                masterDDL,
                (id) => id
                    ? getIngredientsOptions(foods.find(f => f.id === +id).ingredients, getPropertyDescriptor(Common.Ingredient.prototype, 'name').get)
                    : []
            );

    const getFoodsOptions = (foods, type) => {
        const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    const getIngredientsOptions = (data, func) => {
        const options = data.map(s => new Option(s.id, func.call(s), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    const exception = (all, filters) => all.filter((e) => filters.map(a => a.id).indexOf(e.id) === -1);

    // WORKAROUND: if used by Object.prototype break jQuery from 2009.
    const getPropertyDescriptor = (obj, key) => Object.getOwnPropertyDescriptor(obj, key) || getPropertyDescriptor(obj, Object.getPrototypeOf(obj), key);

    const overrideOnSubmit = (service, alertService) => {
        document.getElementById('order-form').onsubmit = async (event) => {

            event.preventDefault();

            const foods = [];
            let user;

            const userId = usersDDL.val();
            if (userId) {
                user = new Common.User(+userId);
            }

            const pizzaId = pizzasDDL.val();
            if (pizzaId) {
                const removals = removalsDDL.val().filter(id => !!id).map(r => new Common.Ingredient(+r));
                const supplements = supplementsDDL.val().filter(id => !!id).map(s => new Common.Ingredient(+s));

                const pizza = new Common.OrderedFood(new Common.Food(+pizzaId), supplements, removals);

                foods.push(pizza);
            }

            const sandwichId = sandwichesDDL.val();
            if (sandwichId) {
                const removals = sandwichesRemovalsDDL.val().filter(id => !!id).map(r => new Common.Ingredient(+r));
                const supplements = sandwichesSupplementsDDL.val().filter(id => !!id).map(s => new Common.Ingredient(+s));

                const sandwich = new Common.OrderedFood(new Common.Food(+sandwichId), supplements, removals);

                foods.push(sandwich);
            }

            const others = [
                kitchenDDL.val(),
                dessertsDDL.val(),
            ].filter(id => !!id);

            others.forEach(id => {
                foods.push(new Common.OrderedFood(new Common.Food(+id)));
            });

            const order = new Order(user, foods);

            try {
                order.validate();
            } catch (error) {
                alertService.error(error.message);
                return false;
            }

            const result = await service.postOrder(order.toDTO());

            alertService.success(result, [new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.link('week-orders')"]]))]);

            return false;
        };
    };

    return class FormController extends BaseController {

        constructor(services) {

            super(template, services[1]);

            privateProps.set(this, {
                service: services[0],
                alertService: services[1],
            });
        }

        async execute() {

            await new ChatController().execute();

            initDDLs();

            overrideOnSubmit(privateProps.get(this).service, privateProps.get(this).alertService);

            let users;
            let foods;
            let supplements;

            try{
                users = await super.invokeWithCatcher(privateProps.get(this).service.getUsers);
                foods = await super.invokeWithCatcher(privateProps.get(this).service.getFoods);
                supplements = await super.invokeWithCatcher(privateProps.get(this).service.getSupplements);

            } catch (error) {
                return;
            }

            new DropDownList(usersDDL, users.map(user => new Option(user.id, user.name, false))).populate();

            new DropDownList(pizzasDDL, getFoodsOptions(foods, 1)).populate();

            new DropDownList(kitchenDDL, getFoodsOptions(foods, 2)).populate();

            new DropDownList(dessertsDDL, getFoodsOptions(foods, 3)).populate();

            new DropDownList(sandwichesDDL, getFoodsOptions(foods, 4)).populate();

            const removalsFactory = buildRemovalFactory(foods);

            removalsFactory(removalsDDL, pizzasDDL);
            removalsFactory(sandwichesRemovalsDDL, sandwichesDDL);

            const supplementsFactory = buildSupplementsFactory(foods, supplements);

            supplementsFactory(supplementsDDL, pizzasDDL);
            supplementsFactory(sandwichesSupplementsDDL, sandwichesDDL);

            return this;
        }
    };

})();