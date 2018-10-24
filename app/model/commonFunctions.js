import {Option} from '../model';

export const CommonFunctions = (function () {

    return class {
        
        getFoodsOptions(foods, type) {

            const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
            options.unshift(Option.getBlankOption());
    
            return options;
        };
    };

})();
