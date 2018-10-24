import {BaseStep} from "../base.step";
import {NavigationStepErrorsEnum} from "./navigation-step-errors.enum";
import {ComponentBuilderPipe} from "../../pipes";

export class ComponentBuilderStep extends BaseStep {

    constructor(router) {
        super(async () => {

            for (let route of router.activatedRoutes) {
                try {
                    await new ComponentBuilderPipe({
                        route: route,
                        component: router.container.get(route.component),
                        guards: route.canActivate.map(guard => router.container.get(guard))
                    }).runAsync();
                }
                catch (e) {
                    if (e.message === NavigationStepErrorsEnum.Unauthorized_Route) {
                        return;
                    }

                    console.log(e);
                }
            }
        });
    }
}
