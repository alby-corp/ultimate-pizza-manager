import {Container} from "../container";
import {AlbyRoutingModule} from "./alby-routing.module";
import {CustomElement} from "../model/custom-element";

export const AlbyModule = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(container, routingModule, elements) {

            if (!container instanceof Container || !routingModule instanceof AlbyRoutingModule || !Array.isArray(elements) || !elements.every(element => element instanceof CustomElement)) {
                throw new Error("Container has to be instance of Core.Container, routingModule has to be instance of AlbyRoutingModule and customElements has to be an array of CustomElement");
            }

            privateProps.set(this, {
                container: container,
                routes: new routingModule().routes,
                elements: elements
            });
        }

        get container() {
            return privateProps.get(this).container;
        }

        get routes() {
            return privateProps.get(this).routes;
        }

        get elements() {
            return privateProps.get(this).elements;
        }
    }
})();
