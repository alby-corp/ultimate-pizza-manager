import {BaseStep} from "../base.step";
import {CustomElementsService} from "../../services/index";
import {CustomElement} from "../../index";

export class OutletCustomElementsStep extends BaseStep {

    constructor(router) {
        super(() => {

            for (let outlet of router.routes.map(r => r.outlet).filter((v, i, a) => a.indexOf(v) === i)) {

                CustomElementsService.defineElement(new CustomElement(outlet, class extends HTMLElement {
                    constructor() {
                        super();
                    }
                }, {extends: 'div'}))
            }
        });
    }
}
