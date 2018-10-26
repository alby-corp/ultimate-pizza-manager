import {Option} from '../model';

export class CommonFunction {

    static getFoodsOptions(foods, type) {

        const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
        options.unshift(Option.getBlankOption());

        return options;
    };
}