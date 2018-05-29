import template from '../views/creator.html';

import {BaseController} from "./base.controller";

export const CreatorController = (function () {

    return class InfoController extends BaseController {

        constructor(services) {
            super(template);

            const execute = async () => {

                const element = $('#creator');
                const api = services[0];

                const ingredients = await api.getSupplements();
                const foods = (await api.getFoods())
                    .filter(food => food.type === 1)
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
                    const sum = (food, ingredients) =>
                        food.price + _.without(ingredients, ...food.ingredients).reduce((total, item) => total + (item.price||0), 0);

                    const min = _.min(foods, food => sum(food, model.selected) * 1000 + _.without(model.selected, ...food.ingredients).length + _.without(food.ingredients, ...model.selected).length);
                    const result = {
                        name: min.name,
                        price: sum(min, model.selected),
                        additions: _.without(model.selected, ...min.ingredients),
                        removals: _.without(min.ingredients, ...model.selected),
                    };
                    return [result];
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

                    return `
                    <div class="ingredients">
                        <h4>Ingredienti</h4>
                        <ul class="list-group">
                            ${model.selected.map(ingredient => `<li class="list-group-item">
                                ${ingredient}<span class="btn btn-danger btn-close" onclick="AlbyJs.trigger(this, 'remove', {id: ${ingredient.id}})">X</span>
                            </li>`).join('')}
                        </ul>
                        <select class="active-ingredient" onchange="AlbyJs.trigger(this, 'set-active', {id: +this.options[this.selectedIndex].value})">
                            <option value="" ${!model.active ? 'selected' : ''}>-</option>
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
                            <div><b>${result.name}</b> -  ${result.price}&euro;<div>
                            <div ${!result.additions.length ? 'hidden' : ''}>
                                Aggiunte
                                <ul>${result.additions.map(ingredient => `<li>${ingredient.name}</li>`).join('')}</ul>
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
                const element = $('#creator');
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
