import {BaseStep} from "../base.step";
import {Router} from "../../router";

export class RouterStep extends BaseStep {

    constructor(app) {
        super(() => new Router(app.routes, app.container));
    }
}
