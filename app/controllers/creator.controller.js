import template from '../views/creator.html';

import {BaseController} from "./base.controller";

export const CreatorController = (function () {

    return class InfoController extends BaseController {

        constructor(services) {
            super(template);

            const execute = async () => {

                const element = $('#creator-outlet');
                const api = services[0];

                const foods = (await api.getFoods())
                    .filter(food => food.type === 1);

                const ingredients = _.uniq(_.flatten(foods.map(food => food.ingredients)), ingredient => ingredient.id);
                const pizzas = foods
                    .map(food => ({
                        name: food.name,
                        price: food.price,
                        ingredients: food.ingredients.map(ingredient => ingredients.find(item => item.id === ingredient.id))
                }));

                const action = (name, handler) => {
                    element.on(name, e => {
                        handler(e);
                        element.html(render(model));
                    });
                };

                const bestMatches = () => {
                    const sumPrices = (food, ingredients) =>
                        food.price + _.without(ingredients, ...food.ingredients).reduce((total, item) => total + (item.price||0), 0);

                    const candidates = pizzas.map(food => {
                        const additions = _.without(model.selected, ...food.ingredients);
                        return {
                            name: food.name,
                            price: sumPrices(food, model.selected),
                            unknownIngredients: additions.filter(addition => !addition.price),
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
                            
                            if (leftChanges === rightChanges)
                            {
                                return 0;
                            }

                            return leftChanges < rightChanges ? -1 : 1;
                        }

                        if (left.price <= right.price && leftIsSubset){
                            return -1;
                        }

                        if (right.price <= left.price && rightIsSubset){
                            return 1;
                        }

                        return undefined;
                    };

                    let mins = [];

                    for (let candidate of candidates) {
                        const comparisons = mins.map(min => [min, compare(min, candidate)]);
                        const exclude = comparisons.some(([_, c]) => c === -1);

                        mins = comparisons.filter(([min, c]) => c !== 1).map(([min]) => min);
                        if(!exclude){
                            mins.push(candidate);
                        }
                    }


                    return mins;
                };

                const model = {
                    available: ingredients,
                    selected: ingredients.filter(ingredient => ingredient.name === 'pomodoro' || ingredient.name === 'mozzarella'),
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
                    <div class="ingredients">
                        <h4>Ingredienti</h4>
                        <ul class="list-group">
                            ${model.selected.map(ingredient => `<li class="list-group-item">
                                ${ingredient}<span class="btn btn-danger btn-close" onclick="AlbyJs.trigger(this, 'remove', {id: ${ingredient.id}})">X</span>
                            </li>`).join('')}
                        </ul>
                        <select class="active-ingredient" onchange="AlbyJs.trigger(this, 'set-active', {id: +this.options[this.selectedIndex].value})">
                            <option value="" ${!model.active ? 'selected' : ''}>- seleziona -</option>
                            ${model.available.map(ingredient => `<option ${model.active === ingredient ? 'selected' : ''} value="${ingredient.id}">${ingredient}</option>`).join('')}
                        </select>
                        <button class="btn btn-primary btn-add" onclick="AlbyJs.trigger(this, 'add')">Aggiungi</button>
                    </div>
                    <div class="results">
                        <h4>Risultati</h4>
                        <ul class="list-group">
                            ${model.results.map(result => `<li class="list-group-item">${renderResult(result)}</li>`).join('')}
                        </ul>
                    </div>
                    `;
                };

                const renderResult = (result) => {
                    return `
                        <div>
                            <div><b>${result.name}</b> -  <span>${result.price.toFixed(2)}${result.unknownIngredients.length ? '+' : ''} &euro;</span><div>
                            <div ${!result.additions.length ? 'hidden' : ''}>
                                Aggiunte
                                <ul>${result.additions.map(ingredient => `<li>${ingredient.name} ${!ingredient.price ? '(prezzo sconosciuto)' : ''}</li>`).join('')}</ul>
                            </div>
                            <div ${!result.removals.length ? 'hidden' : ''}>
                                Rimozioni
                                <ul>${result.removals.map(ingredient => `<li>${ingredient.name}</li>`).join('')}</ul>
                            </div>
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

                action('remove', e => {
                    const item = model.selected.find(ingredient => ingredient.id === e.detail.id);
                    model.selected = _.without(model.selected, item);

                    model.available.push(item);
                    model.results = bestMatches();
                });

                action('set-active', e => model.active = model.available.find(ingredient => ingredient.id === e.detail.id));

                element.html(render(model));

                return this;
            };

            this.execute = async () => {
                const element = $('#creator-outlet');
                element.html('Loading');

                try {
                    return await execute();
                }catch (error) {
                    element.html(`Error: ${error.message || error.statusText}`);
                }
            }
        }
    };

})();
