import template from './creator.html';

import {BaseComponent} from "../base.component";
import {Button, Common, Order} from "../../model/index";

export const CreatorComponent = (function () {

    return class extends BaseComponent {

        get template() {
            return template;
        }

        constructor(service, alertService) {
            super(service, alertService);

            const execute = async () => {

                const element = $('#creator-outlet');
                const api = service;

                const foods = (await api.getFoods())
                    .filter(food => food.type === 1);

                const ingredients = await api.getSupplements();
                const pizzas = foods
                    .map(food => ({
                        id: food.id,
                        name: food.name,
                        price: food.price,
                        ingredients: food.ingredients.map(ingredient => ingredients.find(item => item.id === ingredient.id)).filter(item => !!item)
                    }));

                const action = (name, handler) => {
                    element.on(name, e => {
                        handler(e);
                        element.html(render(model));
                    });
                };

                const bestMatches = () => {
                    const sumPrices = (food, ingredients) =>
                        food.price + _.without(ingredients, ...food.ingredients).reduce((total, item) => total + (item.price || 0), 0);

                    const candidates = pizzas.map(food => {
                        const additions = _.without(model.selected, ...food.ingredients);
                        return {
                            id: food.id,
                            name: food.name,
                            price: sumPrices(food, model.selected),
                            unknownIngredients: additions.filter(addition => addition.price === null),
                            additions: additions,
                            removals: _.without(food.ingredients, ...model.selected),
                        }
                    });

                    const compare = (left, right) => {
                        const intersection = _.intersection(left.unknownIngredients, right.unknownIngredients);

                        const leftIsSubset = left.unknownIngredients.length === intersection.length;
                        const rightIsSubset = right.unknownIngredients.length === intersection.length;

                        if (left.price === right.price && leftIsSubset && rightIsSubset) {
                            const leftChanges = left.additions.length + left.removals.length;
                            const rightChanges = right.additions.length + right.removals.length;

                            if (leftChanges === rightChanges) {
                                return 0;
                            }

                            return leftChanges < rightChanges ? -1 : 1;
                        }

                        if (left.price <= right.price && leftIsSubset) {
                            return -1;
                        }

                        if (right.price <= left.price && rightIsSubset) {
                            return 1;
                        }

                        return undefined;
                    };

                    let mins = [];

                    for (let candidate of candidates) {
                        const comparisons = mins.map(min => [min, compare(min, candidate)]);
                        const exclude = comparisons.some(([_, c]) => c === -1);

                        mins = comparisons.filter(([min, c]) => c !== 1).map(([min]) => min);
                        if (!exclude) {
                            mins.push(candidate);
                        }
                    }


                    return mins;
                };

                const selected = ingredients.filter(ingredient => ingredient.id === 46 || ingredient.id === 30);
                const model = {
                    available: _.without(ingredients, ...selected),
                    selected: selected,
                    active: undefined,
                    results: []
                };

                model.results = bestMatches();

                const render = (model) => {
                    model.available.sort((left, right) => left.name.localeCompare(right.name));
                    model.results.sort((left, right) => {
                        const leftChanges = left.additions.length + left.removals.length;
                        const rightChanges = right.additions.length + right.removals.length;
                        if (leftChanges !== rightChanges) {
                            return leftChanges - rightChanges;
                        }

                        return left.price - right.price;
                    });

                    return `                 
                    <div class="editor">
                        <div class="ingredients">
                            <h4>Ingredienti</h4>
                            <ul class="list-group">
                                ${model.selected.map(ingredient => `<li class="list-group-item">
                                    ${ingredient}<span class="btn btn-danger btn-close" onclick="AlbyJs.CustomEvents.trigger(this, 'remove', {id: ${ingredient.id}})">X</span>
                                </li>`).join('')}
                            </ul>
                            <select class="form-control active-ingredient" onchange="AlbyJs.CustomEvents.trigger(this, 'set-active', {id: +this.options[this.selectedIndex].value})">
                                <option value="" ${!model.active ? 'selected' : ''}>- seleziona -</option>
                                ${model.available.map(ingredient => `<option ${model.active === ingredient ? 'selected' : ''} value="${ingredient.id}">${ingredient}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary btn-add" onclick="AlbyJs.CustomEvents.trigger(this, 'add')">Aggiungi</button>
                        </div>
                        <div class="results">
                            <h4>Risultati</h4>
                            <ul class="list-group">
                                ${model.results.map((result, index) => `<li class="list-group-item">${renderResult(result, index)}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    `;
                };

                const renderResult = (result, index) => {
                    return `
                        <div>
                            <div><b>${result.name}</b> -  <span>${result.price.toFixed(2)}${result.unknownIngredients.length ? '+' : ''} &euro;</span><div>
                            <div ${!result.additions.length ? 'hidden' : ''}>
                                <span style="color: green">+ Aggiunte</span>
                                <ul>${result.additions.map(ingredient => `<li>${ingredient.name} ${ingredient.price === null ? '(prezzo sconosciuto)' : ''}</li>`).join('')}</ul>
                            </div>
                            <div ${!result.removals.length ? 'hidden' : ''}>
                                <span style="color: red">- Rimozioni</span>
                                <ul>${result.removals.map(ingredient => `
                                    <li>${ingredient.name} <span class="badge badge-primary btn-add-removal" onclick="AlbyJs.CustomEvents.trigger(this, 'add-removal', {id: ${ingredient.id}})">+</span></li>`).join('')}
                                </ul>
                            </div>
                            <button class="btn btn-primary btn-order" onclick="AlbyJs.CustomEvents.trigger(this, 'order', {index: ${index}})">Ordina</button>
                        </div>
                    `;
                };

                action('add', () => {
                    if (model.active) {
                        model.selected.push(model.active);
                        model.available = _.without(model.available, model.active);

                        model.active = undefined;
                        model.results = bestMatches();
                    }
                });

                action('add-removal', e => {
                    const id = e.detail.id;
                    const ingredient = model.available.find(ingredient => ingredient.id === id);

                    model.selected.push(ingredient);
                    model.available = _.without(model.available, ingredient);

                    model.results = bestMatches();
                });

                action('remove', e => {
                    const item = model.selected.find(ingredient => ingredient.id === e.detail.id);
                    model.selected = _.without(model.selected, item);

                    model.available.push(item);
                    model.results = bestMatches();
                });

                action('set-active', e => model.active = model.available.find(ingredient => ingredient.id === e.detail.id));

                action('order', async e => {

                    const food = model.results[e.detail.index];
                    const pizza = new Common.OrderedFood(new Common.Food(food.id), food.additions, food.removals);

                    const order = new Order({}, [pizza]);

                    const result = await api.postOrder(order.toDTO());

                    alertService.success(result, [new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.navigate('week-orders')"]]))]);
                });

                element.html(render(model));

                return this;
            };

            this.execute = async () => {
                const element = $('#creator-outlet');
                element.html('Loading');

                try {
                    return await execute();
                } catch (error) {
                    element.html(`Error: ${error.message || error.statusText}`);
                }
            }
        }
    };

})();
