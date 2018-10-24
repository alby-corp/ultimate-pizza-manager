import {BaseStep} from "../base.step";
import {NamespaceService} from "../../services/index";

export class RoaldFuckingStep extends BaseStep {

    constructor() {
        super(() => {
            NamespaceService.register('CustomEvents', 'trigger', (target, name, data) => target.dispatchEvent(new CustomEvent(name, {
                bubbles: true,
                detail: data
            })));
        });
    };
}
