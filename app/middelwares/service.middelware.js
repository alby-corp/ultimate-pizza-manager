import {AuthClient, HttpClient} from "../clients";
import {AuthService, ModalService, ResourceService} from "../services";
import {Container} from "../core/container";
import * as AuthContext from "msal";
import settings from "../settings";

Object.defineProperty(Container.prototype, "initServices", {
    value: function () {

        this.singleton(HttpClient, [`${window.location.origin}/api`]);
        this.singleton(AuthService, [AuthContext.UserAgentApplication]);
        this.singleton(AuthClient, [HttpClient, AuthService]);
        this.singleton(ResourceService, [AuthClient]);
        this.singleton(ModalService, [$('#alert-serivice'), 'alert-service-modal']);

        const config = settings["azure-ad-prod-config"];
        this.factory(AuthContext.UserAgentApplication, callback => new AuthContext.UserAgentApplication(config.clientId, null, callback, config.options))
    }
});
