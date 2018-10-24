export class CustomElementsService {

    static defineElements(elements) {
        for (let element of elements) {
            this.defineElement(element);
        }
    }

    static defineElement(element) {
        customElements.define(element.tag, element.class);
    }
}