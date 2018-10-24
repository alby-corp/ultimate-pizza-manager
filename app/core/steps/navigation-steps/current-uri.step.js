import {BaseStep} from "../base.step";

export class CurrentUriStep extends BaseStep {

    constructor(router) {
        super(() => {
            router.currentUri = router.nextUri;
        });
    }
}
