import {Router} from "./router";
import {AlbyModule} from "./model/alby-module";

export const Core = (function () {

    const privateProps = new WeakMap();

        function initOutletsCustomElements() {
            const outlets = privateProps.get(this).configuration.routes
                .map(r => r.outlet)
                .filter((v, i, a) => a.indexOf(v) === i);

            for (let outlet of outlets) {
                customElements.define(outlet, class extends HTMLDivElement {
                    constructor() {
                        super();
                    }
                }, {extends: 'div'});
            }
        }

        function initCustomElement() {

            for (let element of privateProps.get(this).configuration.customElements){
                customElements.define(element.tag, element.class);
            }
        }

    return class Core {

        constructor(appModule) {

            if(!appModule instanceof AlbyModule){
                throw new Error('AppModule has to be instance of AlbyModule');
            }

            privateProps.set(this, {
                configuration: appModule.configuration
            });

            initOutletsCustomElements.call(this);
            initCustomElement.call(this);

            Router.build(privateProps.get(this).configuration);
        }

        static bootstrapModule(appModule) {
            new Core(appModule);
        }
    }
})();