import {AlbyModule} from "./modules/alby.module";
import {Pipe, CustomElementsStep, RoaldFuckingStep, RouterStep, CorePipe} from "./pipes";

export const Core = (function () {

    return class Core {

        static bootstrapModule(appModule) {

            if (!appModule instanceof AlbyModule) {
                throw new Error('AppModule has to be instance of AlbyModule');
            }

            new CorePipe(appModule).runSync();
        }
    }
})();
