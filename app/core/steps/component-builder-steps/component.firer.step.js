import {AsyncStep} from "../async.step";

export class ComponentFirerStep extends AsyncStep {

    constructor(builder) {
        super(async () => {
            await builder.component.execute();
        });
    }
}
