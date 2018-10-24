import {Pipe} from "./pipe";
import {CustomElementsStep, RoaldFuckingStep, RouterStep} from "../steps";

export class CorePipe extends Pipe {
    constructor(appModule) {
        super(new appModule(), [CustomElementsStep, RoaldFuckingStep, RouterStep]);
    }
}
