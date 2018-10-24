import {Container} from "../core/container";
import {AuthGuard} from "../guards";
import {AuthService} from "../services";

Object.defineProperty(Container.prototype, "initGuards", {
    value: function () {

        this.singleton(AuthGuard, [AuthService]);
    }
});