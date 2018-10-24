import {BaseStep} from "../base.step";

export class ActivatedRouteStep extends BaseStep {

    constructor(router) {
        super(() => {

            router.activatedRoutes = router.routes.filter(r => r.path === router.nextUri.replace(/\?.+/, ''));

            if (router.activatedRoutes.length === 0) {
                router.activatedRoutes = router.routes.filter(r => `${r.path}` === '**');
            }
        });
    }
}
