import {Container} from "../core/container";
import {LoginElement, MenuElement} from "../elements";
import {AuthService} from "../services";

Object.defineProperty(Container.prototype, "initCustomElements", {
    value: function () {

        const service = [AuthService];

        this.element(LoginElement, service);
        this.element(MenuElement, service);
    }
});
