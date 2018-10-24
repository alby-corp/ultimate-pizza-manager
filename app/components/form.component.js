import template from '../views/form.html';

import {Option, Common, Order, DropDownList,FoodWithRemovals,FixedFood, Button} from '../model';
import {BaseComponent} from "./base.component";
import {ChatComponent} from "./chat.component";
import { integer } from '@oclif/parser/lib/flags';

export const FormComponent = (function () {

    let _foodElementDDL;
    let _foods;
    let _supplements;
    let _foodNelCarrello = [];
    let _self;

    const privateProps = new WeakMap();

    const foodTypesChangeValue = (DDL) => () => {
        let foodType = DDL.val();
        $(`#foodTypeSuplementi`).empty();
        $(`#foodTypeRimozioni`).empty();
        $("#SupplementiRimozioni").collapse('hide');
        $("#btnRimozioni").hide();
        $("#ordinaSubito").prop("disabled",true);
        $("#carrello").prop("disabled",true); 

        switch(foodType) {
            case "2":
                new FixedFood('piatti',2,_foods); 
                _foodElementDDL =  $(`#piatti`);
                break;
            case "3":
                new FixedFood('dolce',3,_foods);
                _foodElementDDL =  $(`#dolce`);
                break;
            case "4":
                new FoodWithRemovals('sandwiches', 4, _foods, _supplements);
                _foodElementDDL =  $(`#sandwiches`);
                break;
            default:
                new FoodWithRemovals('pizzas', 1, _foods, _supplements);
                _foodElementDDL =  $(`#pizzas`);
        }
    };
    
    const readFoodData = () => {
        const foods = [];
        const elementId = _foodElementDDL.val();
        const hasRemovals = $(`#removals`).val();

        if (hasRemovals && elementId) {
            const removals = $(`#removals`).val().filter(id => !!id).map(r => new Common.Ingredient(+r));
            const supplements = $(`#supplements`).val().filter(id => !!id).map(s => new Common.Ingredient(+s));
            
            const orderedFood = new Common.OrderedFood(new Common.Food(+elementId), supplements, removals);

            foods.push(orderedFood);
        }
        else if (elementId){
            const kitchenIds = elementId.filter(id => !!id);

            kitchenIds.forEach(id => {
                foods.push(new Common.OrderedFood(new Common.Food(+id)));
            });
        }

        return foods;
    };  

    const renderCarrello = () =>{
        let id = 0;
        let total = 0.0;
        let foodIds = [];
        let html = `<div >
                        <ul> ${!_foodNelCarrello.length ? '' : `${_foodNelCarrello.map(f => {
                            let food = _foods.find(fs => fs.id == f.food.id);
                            let additions = f.supplements.map(i => _supplements.find(sp => sp.id == i.id));
                            let removals = f.removals.map(ri => food.ingredients.find(fi => fi.id == ri.id));
                            total += food.price + additions.reduce((acc, supplement) => acc += supplement.price, 0);
                            foodIds.push(food.id);
                            id++
                            return `<li>
                                <div>
                                    <b>${food.name}</b> - <span>${food.price.toFixed(2)} &euro;</span>
                                    <button id=btnDelete_${id} type="button" class="badge badge-danger btn-close">x</button>
                                         
                                    <div>${!additions.length > 0 ? '' : 
                                        `<span style="color: green">+ Aggiunte</span>
                                        <ul>
                                            ${additions.map(ingredient =>
                                                `<li>
                                                    ${ingredient.name} ${ingredient.price === null ? '(prezzo sconosciuto)' :
                                                    `- <span>${ingredient.price.toFixed(2)} &euro;</span>` }
                                                </li>`).join('')}
                                        </ul>`}
                                    </div>
                                    <div>${!removals.length > 0 ? '' : 
                                        `<span style="color: red">- Rimozioni</span>
                                        <ul>${removals.map(ingredient => 
                                            `<li>
                                                ${ingredient.name} 
                                            </li>`).join('')}
                                        </ul>`}
                                    </div>
                                </div>
                            </li>`}).join('')} 
                            <li>
                                 <b>Totale ordine</b> - <span>${total.toFixed(2)} &euro;</span>
                            </li>`
                            }
                        </ul>
                        <button id="cancellaCarrello" disabled=true class="btn btn-danger">Cancella</button>
                        <button id="ordinaCarrello" disabled=true class="btn btn-primary">Ordina</button>
                    </div>`

        $(`#orders`).empty().html(html);
        document.getElementById('ordinaCarrello').addEventListener('click', ordinaCarrello);
        document.getElementById('cancellaCarrello').addEventListener('click', cancellaCarrello); 
         
        id = 0
        foodIds.map(foodId => {
            id++
            let elementSelector = document.getElementById(`btnDelete_${id}`);
            elementSelector.addEventListener('click', deleteOrdine);
            elementSelector.foodId = foodId;
        });

        if(_foodNelCarrello.length ==0){
            $("#ordinaCarrello").prop("disabled",true);
            $("#cancellaCarrello").prop("disabled",true);          
        }
        else{
            $("#ordinaCarrello").prop("disabled",false);
            $("#cancellaCarrello").prop("disabled",false);                      
        } 
        if(_foodElementDDL.val() == ""){
            $("#ordinaSubito").prop("disabled",true);
        }      
    };

    const buildOverrideOnSubmitHandler = () => {
        document.getElementById('order-form').onsubmit =  (event) => {
            event.preventDefault();
        };
    };

    const ordinaSubito = () => {
        submitOrder(readFoodData());
    };

    const aggiungiAlCarrello = () => {
        _foodNelCarrello = _foodNelCarrello.concat(readFoodData());
        renderCarrello();
    };

    const ordinaCarrello = () => {
        submitOrder( _foodNelCarrello);
    };

    const deleteOrdine = (evt) => {
        const item = _foodNelCarrello.find(of => of.food.id === evt.target.foodId);
        _foodNelCarrello = _.without(_foodNelCarrello, item);
        renderCarrello();
    };

    const cancellaCarrello = () =>{
        _foodNelCarrello = [];
        renderCarrello();
    };

    const submitOrder = async (totalFood) => {

        let user;

        const userId = 10;
        if (userId) {
            user = new Common.User(+userId);
        }

        const order = new Order(user, totalFood);

        try {
            order.validate();
        } catch (error) {
            privateProps.get(_self).alertService.error(error.message);
            return false;
        }

        const result = await privateProps.get(_self).service.postOrder(order.toDTO());

        privateProps.get(_self).alertService.success(result, [new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.navigate('week-orders')"]]))]);

        _foodNelCarrello = [];

        return false;
    };

    return class extends BaseComponent {

        constructor(service, alertService) {

            super(template, alertService);

            const element = $('#creator-outlet');
            _self = this;

            privateProps.set(this, {
                service,
                alertService,
            });
        };

        get template() {
            return template;
        }

        async execute() {

            await new ChatComponent().execute();

            document.getElementById('ordinaSubito').addEventListener('click', ordinaSubito);
            document.getElementById('carrello').addEventListener('click', aggiungiAlCarrello);
            
            buildOverrideOnSubmitHandler(privateProps.get(this).service, privateProps.get(this).alertService);
            
            let foodTypes;

            try {
                foodTypes = await super.invokeWithCatcher(privateProps.get(this).service.getFoodTypes);
                _foods = await super.invokeWithCatcher(privateProps.get(this).service.getFoods);
                _supplements = await super.invokeWithCatcher(privateProps.get(this).service.getSupplements);
            } catch (error) {
                return;
            }

            let foodTypesDoSomething = foodTypesChangeValue($('#foodTypes'));
            new DropDownList('foodTypes', foodTypes.map(ft => new Option(ft.id, ft.description, false)))
                    .populate()
                    .onChangeEvent(foodTypesDoSomething);

            new FoodWithRemovals('pizzas', 1, _foods, _supplements);
            _foodElementDDL =  $(`#pizzas`);  

            renderCarrello();

            return this;
        }
    };

})();