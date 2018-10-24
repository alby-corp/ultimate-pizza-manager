import {BaseStep} from "../base.step";
import {NamespaceService} from "../../services/index";

export class NamespaceStep extends BaseStep {

    constructor(router) {
        super(() => {
            NamespaceService.register('Router', 'navigate', router.navigate.bind(router))
            NamespaceService.register('Router', 'currentUri', () => router.currentUri)
        });
    }
}
