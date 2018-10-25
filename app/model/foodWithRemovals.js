import {Option, Common, CommonFunctions, DropDownList} from '../model';

export const FoodWithRemovals = (function () {
    
    const hideShowButton = (DDL, target, collapsableObject) => () => {
        if (DDL.val() == "") {
            collapsableObject.collapse('hide');
            target.hide();
            $("#ordinaSubito").prop("disabled",true);
            $("#carrello").prop("disabled",true); 
        } else {
            target.show();
            $("#ordinaSubito").prop("disabled",false);
            $("#carrello").prop("disabled",false);            
        }
    };

    const suplementsFilter = (foods, supplements) =>  (id) => 
        id  ? getIngredientsOptions(findDifferentValues(supplements, foods.find(f => f.id === +id).ingredients), Common.Ingredient.prototype.toString)
            : getIngredientsOptions(supplements, Common.Ingredient.prototype.toString);

    const removalsFilter = (foods) => (id) => 
        id  ? getIngredientsOptions(foods.find(f => f.id === +id).ingredients, getPropertyDescriptor(Common.Ingredient.prototype, 'name').get)
            : [];

    const getIngredientsOptions = (data, func) => {
        const options = data.map(s => new Option(s.id, func.call(s), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    // WORKAROUND: if used by Object.prototype break jQuery from 2009.
    const getPropertyDescriptor = (obj, key) => Object.getOwnPropertyDescriptor(obj, key) || getPropertyDescriptor(obj, Object.getPrototypeOf(obj), key);

    const findDifferentValues = (all, filters) => all.filter((e) => filters.map(a => a.id).indexOf(e.id) === -1);

    return class  {
        constructor(id, type, foods, supplements) {
            let label = id.charAt(0).toUpperCase() + id.slice(1);
            //Creo la master dropdown
            let masterDropdown = new DropDownList(id, CommonFunctions.getFoodsOptions(foods, type), label, "",1,$('#foodTypeDropdown'));
            let masterDDL = $(`#${id}`);
            let masterHideShowButton = hideShowButton(masterDDL, $("#btnRimozioni"), $("#SupplementiRimozioni"));
            masterDropdown.populate()
                          .onChangeEvent(masterHideShowButton);
            //Creo la removals dropdown
            new DropDownList('removals',null,'Rimozioni',"multiple",4,$('#foodTypeRimozioni'))
                .conditionalEnable(masterDDL)
                .populateWithFilter(masterDDL, removalsFilter(foods));
            //Creo la supplements dropdown  
            new DropDownList('supplements',null,'Supplementi',"multiple",8,$('#foodTypeSuplementi'))
                .conditionalEnable(masterDDL)
                .populateWithFilter(masterDDL, suplementsFilter(foods, supplements));
        };
    };
})();