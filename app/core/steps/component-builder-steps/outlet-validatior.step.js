import {BaseStep} from "../base.step";
import {NavigationStepErrorsEnum} from "../navigation-steps/navigation-step-errors.enum";

export class OutletValidatorStep extends BaseStep {

    constructor(builder) {
        super(() => {

            const resolvedOutlet = document.getElementsByTagName(builder.route.outlet);

            if (resolvedOutlet.length > 1) {
                throw new Error(NavigationStepErrorsEnum.Multiple_Outlets);
            }

            if (resolvedOutlet.length < 1) {
                throw new Error(NavigationStepErrorsEnum.No_Outlets_Found);
            }

            builder.resolvedOutlet = resolvedOutlet[0];
        });
    }
}
