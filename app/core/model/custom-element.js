
export const CustomElement = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(tag, c){

            privateProps.set(this, {
                tag: tag,
                class: c
            });
        }

        get tag(){
            return privateProps.get(this).tag;
        }

        get class(){
            return privateProps.get(this).class
        }
    }
})();