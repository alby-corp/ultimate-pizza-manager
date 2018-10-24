import {BaseStep} from "../base.step";

    export class ComponentRenderStep extends BaseStep {

        constructor(builder) {
            super(() => {
                builder.resolvedOutlet.innerHTML = builder.component.template;
            });
        }
    }
