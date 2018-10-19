import {Route} from "./route";
import {Container} from "../container";
import {CustomElement} from "./custom-element";

export const CoreConfig = (function () {

    const privateProps = new WeakMap();

    const typedArrayValidator = (array, type) => {
        let isValid = Array.isArray(array);

        for (let element of array) {
            isValid = isValid && element instanceof type;
        }

        if (!isValid) {
            throw new Error(`Parameter has to be an Array of ${type} objects`);
        }
    };

    return class {

        constructor() {

            privateProps.set(this, {
                routes: [],
                container: {},
                customElements: []
            });
        }

        get routes() {
            return privateProps.get(this).routes;
        }

        set routes(routes) {

            typedArrayValidator(routes, Route);

            privateProps.get(this).routes = routes;
        }

        get container() {
            return privateProps.get(this).container;
        }

        set container(container) {

            if(!container instanceof Container){
                throw new Error("Parameter has to be instance of Container Class");
            }

            privateProps.get(this).container = container;
        }

        get customElements(){
           return privateProps.get(this).customElements;
        }

        set customElements(elements){
            typedArrayValidator(elements, CustomElement);

            privateProps.get(this).customElements = elements;
        }
    }
})();