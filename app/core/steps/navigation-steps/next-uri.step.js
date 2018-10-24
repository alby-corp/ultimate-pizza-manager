import {BaseStep} from "../base.step";

export class NextUri extends BaseStep {

    constructor(router) {
        super(() => {
            router.nextUri = `/${uri}`;
        });
    }
}
