import {DropDownList} from '../model';
import {CommonFunction as CommonFunctions} from "./commonFunctions";

export const FixedFood = (function () {

    const hideShowButton = (DDL) => () => {
        if (DDL.val() == "") {
            $("#ordinaSubito").prop("disabled", true);
            $("#carrello").prop("disabled", true);
        } else {
            $("#ordinaSubito").prop("disabled", false);
            $("#carrello").prop("disabled", false);
        }
    };

    return class {
        constructor(id, type, foods) {
            let label = id.charAt(0).toUpperCase() + id.slice(1);
            let masterDropdown = new DropDownList(id, CommonFunctions.getFoodsOptions(foods, type), label, 'multiple', 8, $('#foodTypeDropdown'));
            let masterDDL = $(`#${id}`);
            let masterHideShowButton = hideShowButton(masterDDL);
            masterDropdown.populate()
                .onChangeEvent(masterHideShowButton);

        };
    };

})();

