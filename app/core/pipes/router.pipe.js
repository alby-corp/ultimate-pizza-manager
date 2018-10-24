import {Pipe} from "./pipe";
import {NamespaceStep, OutletCustomElementsStep} from "../steps";

export class RouterPipe extends Pipe {
    constructor(router) {
        super(router, [OutletCustomElementsStep, NamespaceStep]);
    }
}
