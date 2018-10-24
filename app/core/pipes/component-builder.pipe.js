import {Pipe} from "./pipe";
import {
    ActivatedGuardCheckerStep,
    ComponentFirerStep,
    ComponentRenderStep,
    OutletValidatorStep
} from "../steps";

export class ComponentBuilderPipe extends Pipe {
    constructor(config) {
        super(config, [OutletValidatorStep, ActivatedGuardCheckerStep, ComponentRenderStep, ComponentFirerStep]);
    }
}
