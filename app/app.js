import {Route, Router, Component} from './core';
import {ResourceService, ModalService, AuthService} from './services';
import {HttpClient, AuthClient} from './clients';
import {
    OrdersComponent,
    NotFoundComponent,
    MenuComponent,
    InfoComponent,
    FormComponent,
    CreatorComponent,
    SignedinComponent
} from './components';

export const App = (function () {

    const registerServices = (self) => {

        if (self.Services === undefined) {
            self.Services = {};
        }

        const httpClient = new HttpClient(window.location.origin);
        // +
        const authService = new AuthService();
        // =
        const authClient = new AuthClient(httpClient, authService);

        self.Services.ResourceService = new ResourceService(authClient);
        self.Services.AlertService = new ModalService($('#alert-serivice'), 'alert-service-modal');
        self.Services.AuthService = authService;
    };

    const registerControllers = (self) => {

        if (self.Components === undefined) {
            self.Components = {};
        }

        const services = [self.Services.ResourceService, self.Services.AlertService];

        self.Components.formCtrl = new Component(FormComponent, services);
        self.Components.menuCtrl = new Component(MenuComponent, services);
        self.Components.infoCtrl = new Component(InfoComponent, services);
        self.Components.ordersCtrl = new Component(OrdersComponent, services);
        self.Components.creatorCtrl = new Component(CreatorComponent, services);
        self.Components.notFoundCtrl = new Component(NotFoundComponent);
        self.Components.signedInCtrl = new Component(SignedinComponent, [self.Services.AuthService, self.Services.alertService]);
    };

    const registerRoutes = (self) => {

        if (self.Routes === undefined) {
            self.Routes = {};
        }

        const outlet = $('#container');

        self.Routes = new Map()
            .set("/", new Route(self.Components.formCtrl, outlet))
            .set("/menu", new Route(self.Components.menuCtrl, outlet))
            .set("/info", new Route(self.Components.infoCtrl, outlet))
            .set("/week-orders", new Route(self.Components.ordersCtrl, outlet))
            .set('/crea-la-tua-pizza', new Route(self.Components.creatorCtrl, outlet))
            .set('/not-found', new Route(self.Components.notFoundCtrl, outlet))
            .set('/signed-in', new Route(self.Components.signedInCtrl));
    };

    const registerRouter = (self) => {
        if (self.Router === undefined) {
            self.Router = {};
        }

        self.Router = new Router(self.Routes)
    };

    const registerNamespaces = (self) => {

        if (window.AlbyJs === undefined) {
            window.AlbyJs = {
                AuthService: {},
                Router: {}
            };
        }

        AlbyJs.AuthService.signin = self.Services.AuthService.signin;
        AlbyJs.AuthService.signout = self.Services.AuthService.signout;

        AlbyJs.AuthService.user = self.Services.AuthService.user();

        AlbyJs.Router.link = self.Router.link.bind(self.Router);

        AlbyJs.trigger = (target, name, data) => target.dispatchEvent(new CustomEvent(name, {
            bubbles: true,
            detail: data
        }));
    };

    return class App {

        constructor() {

            // Services
            registerServices(this);

            // Components
            registerControllers(this);

            // Routes
            registerRoutes(this);

            registerRouter(this);

            // Namespace
            registerNamespaces(this);
        }
    };
})();