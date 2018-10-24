export const CustomElement = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(tag, clazz) {

            privateProps.set(this, {
                tag: tag,
                class: clazz
            });
        }

        get tag() {
            return privateProps.get(this).tag;
        }

        get class() {
            return privateProps.get(this).class
        }
    }
})();