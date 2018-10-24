import {BaseStep} from "../base.step";
import {CustomElementsService} from "../../services/index";

export class CustomElementsStep extends BaseStep {

    constructor(app) {
        super(() => CustomElementsService.defineElements(app.elements));
    }
}
