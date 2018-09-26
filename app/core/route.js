export const Route = (function () {

    const privateProps = new WeakMap();

    return class {
        constructor(controller, outlet) {

            privateProps.set(this, {
                controller: controller,
                outlet: (data) => {
                    if (outlet != undefined && data != undefined) {
                        outlet.empty().html(data);
                    }
                }
            });
        }

        get controller() {
            return privateProps.get(this).controller;
        }

        get outlet() {
            return privateProps.get(this).outlet;
        }
    }

})();
