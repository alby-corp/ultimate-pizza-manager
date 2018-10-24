import {AsyncStep} from "../async.step";
import {UnauthorizedRouteError} from "../../errors";

export class ActivatedGuardCheckerStep extends AsyncStep {

    constructor(builder) {
        super(async () => {

            if (!builder.route.canActivate || (Array.isArray(builder.route.canActivate) && builder.route.canActivate.length === 0)) {
                return;
            }

            for (let guard of builder.guards) {

                try {
                    const isAuthenticated = await guard.canActivated();

                    if (isAuthenticated) {
                        return;
                    }

                } catch (e) {
                    if (e instanceof UnauthorizedRouteError) {
                        e.callback();
                    } else {
                        throw e;
                    }
                }
            }
        });
    }
}
